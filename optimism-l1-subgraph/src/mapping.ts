import { Bytes } from '@graphprotocol/graph-ts';
import {
  RelayedMessage as RelayedMessageEvent,
  SentMessage as SentMessageEvent,
} from '../generated/OVM_CrossDomainMessenger/OVM_CrossDomainMessenger';
import { RelayedMessage, SentMessage, MessageStats } from '../generated/schema';

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
  relayedMessage.txHash = event.transaction.hash.toHex();
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
  sentMessage.txHash = event.transaction.hash.toHex();
  sentMessage.from = event.transaction.from;
  sentMessage.message = event.params.message;
  sentMessage.index = stats.sentMessageCount;

  stats.sentMessageCount = stats.sentMessageCount + 1;
  stats.save();
  sentMessage.save();
}
