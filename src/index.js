import { JsonRpc } from './jsonrpc';

import BN from 'bn.js';

import {hexToBytes, stringToBytes} from './util';

import {LittleEndian} from './binary';

const ZHASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

class Contract {
  constructor(bin, abi, opts){
    this.bin = bin;
    this.abi = abi;
    this.opts = opts;
  }
  packArgs(method, args){ 
    if (!method || args.length !== method.argc) {
      return;
    }
    let arr = [];
    for (let i=0; i<method.argc; i++) {
      let argobj = method.args[i];
      const {type} = argobj;
      const argv = args[i];
      const argvt = typeof(argv);
      const argvl = argv.length;

      if (type === 'CTypeString') {
        // todo
        if (argvt !== 'string') {
          throw new Error('type check err');
        }
        const lenprefix = LittleEndian.uint64ToBytes(argvl);
        const dd = stringToBytes(argv); 
        console.log('argvl', lenprefix, dd);
      }else if (type === 'CTypeUint8'){
        // todo
      }else if (type === 'CTypeUint256'){
        // todo
      }
    }
  }

  deploy(args) {
    if (!(ZHASH in this.abi)) {
      return;
    }
    if (args !== undefined && !Array.isArray(args)) {
      return;
    }
    const method = this.abi[ZHASH];
    this.packArgs(method, args)
  }
}

export {
  Contract,
  JsonRpc,
};
