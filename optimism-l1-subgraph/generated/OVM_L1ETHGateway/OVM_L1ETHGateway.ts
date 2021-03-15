// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DepositInitiated extends ethereum.Event {
  get params(): DepositInitiated__Params {
    return new DepositInitiated__Params(this);
  }
}

export class DepositInitiated__Params {
  _event: DepositInitiated;

  constructor(event: DepositInitiated) {
    this._event = event;
  }

  get _from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WithdrawalFinalized extends ethereum.Event {
  get params(): WithdrawalFinalized__Params {
    return new WithdrawalFinalized__Params(this);
  }
}

export class WithdrawalFinalized__Params {
  _event: WithdrawalFinalized;

  constructor(event: WithdrawalFinalized) {
    this._event = event;
  }

  get _to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OVM_L1ETHGateway extends ethereum.SmartContract {
  static bind(address: Address): OVM_L1ETHGateway {
    return new OVM_L1ETHGateway("OVM_L1ETHGateway", address);
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DepositToCall extends ethereum.Call {
  get inputs(): DepositToCall__Inputs {
    return new DepositToCall__Inputs(this);
  }

  get outputs(): DepositToCall__Outputs {
    return new DepositToCall__Outputs(this);
  }
}

export class DepositToCall__Inputs {
  _call: DepositToCall;

  constructor(call: DepositToCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DepositToCall__Outputs {
  _call: DepositToCall;

  constructor(call: DepositToCall) {
    this._call = call;
  }
}

export class FinalizeWithdrawalCall extends ethereum.Call {
  get inputs(): FinalizeWithdrawalCall__Inputs {
    return new FinalizeWithdrawalCall__Inputs(this);
  }

  get outputs(): FinalizeWithdrawalCall__Outputs {
    return new FinalizeWithdrawalCall__Outputs(this);
  }
}

export class FinalizeWithdrawalCall__Inputs {
  _call: FinalizeWithdrawalCall;

  constructor(call: FinalizeWithdrawalCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class FinalizeWithdrawalCall__Outputs {
  _call: FinalizeWithdrawalCall;

  constructor(call: FinalizeWithdrawalCall) {
    this._call = call;
  }
}