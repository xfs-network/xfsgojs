import {LittleEndian} from './binary';
import {stringToBytes, arrCopy} from './util';

import { isBN } from 'bn.js';
import BN from 'bn.js';

class UBuffer {
  constructor(){
    this.off = 0;
    this.len = 0;
  }
  tryGrowByReslice(n){
    let m = this.data?.length || 0;
    if (m === 0){
      return [0,false]
    }
    let tmp = new Uint8Array(m + n)
    this.data = arrCopy(this.data, 0, tmp, 0, this.data.length);
    return [m,true]
  }
  grow(n) {
    const [m, ok] = this.tryGrowByReslice(n);
    if (ok) {
      return m;
    }
    if (!this.data) {
      this.data = new Uint8Array(n);
      return 0;
    }

  }
  write(data){
    let blocks = Math.floor(data.length / 8);
    let mod = data.length % 8;
    if (mod !== 0){
      blocks += 1;
    }
    let m = this.grow(blocks * 8);
    let out = arrCopy(data, 0, this.data, m, data.length)
    this.data = out;
  }
  writeString(s){
    this.writeUInt64(s.length);
    const sbytes = stringToBytes(s);
    this.write(sbytes);
  }
  writeUInt64(n){
    const nn = LittleEndian.uint64ToBytes(n);
    this.write(nn);
  }
  writeUInt256(n){
    let nn = n.toArrayLike(Uint8Array, 'le', 32);
    this.write(nn)
  }
  toArrays(){
    return this.data;
  }
};

export default UBuffer;
