const LittleEndian = {
  uint64ToBytes: function(n){
    const data = new Uint8Array(8);
    data[0] = (n & 0xff);
    data[1] = ((n >>> 8) & 0xff);
    data[2] = ((n >>> 16) & 0xff);
    data[3] = ((n >>> 24) & 0xff);
    data[4] = 0;
    data[5] = 0;
    data[6] = 0;
    data[7] = 0;
    return data;
  }
};

export {
  LittleEndian,
}
