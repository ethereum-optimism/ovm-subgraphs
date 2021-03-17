import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { WithdrawalInitiated as WithdrawalInitiatedEvent } from '../generated/SynthetixBridgeToBase/SynthetixBridgeToBase';
import {
  SentMessage as SentMessageEvent,
  RelayedMessage as RelayedMessageEvent,
} from '../generated/OVM_CrossDomainMessenger/OVM_CrossDomainMessenger';
import { Withdrawal, SentMessage, RelayedMessage, MessageStats, TxStats } from '../generated/schema';

const STATS_ID = '1';

// OVM cross domain messenger
export function handleMessageRelayed(event: RelayedMessageEvent): void {
  // create a stats entity if this is the first event, else update the existing one
  let stats = MessageStats.load(STATS_ID);
  if (stats == null) {
    stats = new MessageStats(STATS_ID);
    stats.relayedMessageCount = 0;
    stats.sentMessageCount = 0;
  }
  stats.relayedMessageCount = stats.relayedMessageCount + 1;
  stats.save();

  const relayedMessage = new RelayedMessage(event.params.msgHash.toHex());
  relayedMessage.to = event.transaction.to as Bytes;
  relayedMessage.txHash = event.transaction.hash.toHex();
  relayedMessage.timestamp = event.block.timestamp.toI32();
  relayedMessage.msgHash = event.params.msgHash.toHex();
  relayedMessage.index = stats.relayedMessageCount;

  stats.relayedMessageCount = stats.relayedMessageCount + 1;
  relayedMessage.save();
}

export function handleSentMessage(event: SentMessageEvent): void {
  // create a stats entity if this is the first event, else update the existing one
  let stats = MessageStats.load(STATS_ID);
  if (stats == null) {
    stats = new MessageStats(STATS_ID);
    stats.relayedMessageCount = 0;
    stats.sentMessageCount = 0;
  }

  const sentMessage = new SentMessage(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  sentMessage.timestamp = event.block.timestamp.toI32();
  sentMessage.txHash = event.transaction.hash.toHex();
  sentMessage.from = event.transaction.from;
  sentMessage.message = event.params.message;
  sentMessage.index = stats.sentMessageCount;

  stats.sentMessageCount = stats.sentMessageCount + 1;
  stats.save();
  sentMessage.save();
}

// L2 contract
export function handleWithdrawal(event: WithdrawalInitiatedEvent): void {
  const withdrawal = new Withdrawal(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  // create a stats entity if this is the first event, else update the existing one
  let stats = TxStats.load(STATS_ID);
  if (stats == null) {
    stats = new TxStats(STATS_ID);
    stats.totalCount = 0;
    stats.totalAmount = BigInt.fromI32(0);
  }
  withdrawal.index = stats.totalCount;
  stats.totalCount = stats.totalCount + 1;
  stats.totalAmount = stats.totalAmount.plus(event.params.amount);
  stats.save();

  withdrawal.timestamp = event.block.timestamp.toI32();
  withdrawal.txHash = event.transaction.hash.toHex();
  withdrawal.account = event.params.account;
  withdrawal.amount = event.params.amount;
  withdrawal.bridgeAddress = event.address;
  withdrawal.save();
}
