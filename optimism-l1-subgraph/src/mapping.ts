import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  RelayedMessage as RelayedMessageEvent,
  SentMessage as SentMessageEvent,
} from '../generated/OVM_CrossDomainMessenger/OVM_CrossDomainMessenger';
import { Deposit as DepositEvent } from '../generated/SynthetixBridgeToOptimism/SynthetixBridgeToOptimism';
import { RelayedMessage, Deposit, SentMessage, MessageStats, TxStats } from '../generated/schema';

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

  const relayedMessage = new RelayedMessage(event.params.msgHash.toHex());
  relayedMessage.to = event.transaction.to as Bytes;
  relayedMessage.hash = event.transaction.hash.toHex();
  relayedMessage.timestamp = event.block.timestamp.toI32();
  relayedMessage.msgHash = event.params.msgHash.toHex();
  relayedMessage.index = stats.relayedMessageCount;

  stats.relayedMessageCount = stats.relayedMessageCount + 1;
  stats.save();
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
  sentMessage.hash = event.transaction.hash.toHex();
  sentMessage.from = event.transaction.from;
  sentMessage.message = event.params.message;
  sentMessage.index = stats.sentMessageCount;

  stats.sentMessageCount = stats.sentMessageCount + 1;
  stats.save();
  sentMessage.save();
}

export function handleDeposit(event: DepositEvent): void {
  const deposit = new Deposit(event.transaction.hash.toHex());

  // create a stats entity if this is the first event, else update the existing one
  let stats = TxStats.load(STATS_ID);
  if (stats == null) {
    stats = new TxStats(STATS_ID);
    stats.totalCount = 0;
    stats.totalAmount = BigInt.fromI32(0);
  }
  // zero indexed
  deposit.index = stats.totalCount;
  deposit.timestamp = event.block.timestamp.toI32();
  deposit.hash = event.transaction.hash.toHex();
  deposit.account = event.params.account;
  deposit.amount = event.params.amount;
  deposit.bridgeAddress = event.address;
  deposit.save();

  stats.totalCount = stats.totalCount + 1;
  stats.totalAmount = stats.totalAmount.plus(event.params.amount);
  stats.save();
}
