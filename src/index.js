import { JsonRpc } from './jsonrpc';

import BN from 'bn.js';

import {bytesToHex, concatBytes, hexToBytes, stringToBytes} from './util';

import {LittleEndian} from './binary';
import UBuffer from './buffer';
import { isBN } from 'bn.js';

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
    const buffer = new UBuffer();
    for (let i=0; i<method.argc; i++) {
      let argobj = method.args[i];
      const {type} = argobj;
      const argv = args[i];
      const argvt = typeof(argv);
      if (type === 'CTypeString') {
        if (argvt !== 'string') {
          throw new Error('type check err');
        }
        buffer.writeString(argv);
      }else if (type === 'CTypeUint8'){
        if (Number.isNaN(argv) || !Number.isInteger(argv)){
          throw new Error('type check err');
        }
        if (argv >>> 8 > 0){
          throw new Error('out of number');
        }
        let reln = argv && 0xff;
        buffer.write(Uint8Array.of(reln));
        // todo
      }else if (type === 'CTypeUint256'){
        // todo
        if (!argv || !isBN(argv)) {
          throw new Error('type check err');
        }
        buffer.writeUInt256(argv);
      }
    }
    return buffer.toArrays();
  }

  deploy(args) {
    if (!(ZHASH in this.abi)) {
      return;
    }
    if (args !== undefined && !Array.isArray(args)) {
      return;
    }
    const method = this.abi[ZHASH];
    let buf = hexToBytes(this.bin);
    buf = concatBytes(buf, hexToBytes(ZHASH));
    let argsbuf = this.packArgs(method, args);
    buf = concatBytes(buf, argsbuf);
    let out = bytesToHex(buf);
    console.log('0x' + out);
  }
  exec(m, args) {
    const findMethod = () => {
      for (let key in this.abi){
        const abiObj = this.abi[key];
        if (abiObj?.name === m) {
          return [key, abiObj];
        }
      }
    }
    const [k, method] = findMethod();
    if (!k || !method){
      throw new Error(`Notfound method name: ${m}`);
    }
    let buf = hexToBytes(this.bin);
    buf = concatBytes(buf, hexToBytes(k));
    let argsbuf = this.packArgs(method, args);
    buf = concatBytes(buf, argsbuf||[]);
    let out = bytesToHex(buf);
    console.log('0x' + out);
  }
}

export {
  Contract,
  JsonRpc,
};
