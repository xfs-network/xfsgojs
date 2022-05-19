import { JsonRpc } from './jsonrpc';

const ZHASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
class Contract {
  constructor(bin, abi, opts){
    this.bin = bin;
    this.abi = abi;
    this.opts = opts;
  }
  deploy() {
    if (!(ZHASH in this.abi)) {
      return
    }
    const method = this.abi[ZHASH];
    console.log("got!!", method);
  }
}

export {
  Contract,
  JsonRpc,
};
