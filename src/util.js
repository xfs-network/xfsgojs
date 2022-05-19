function hexToBytes(s) {
  if (!s || s === "" || s.length % 2 !== 0) {
    return null;
  }
  if (s.startsWith('0x')) {
    s = s.slice(2);
  }
  let bytesNum = s.length / 2;
  let data = new Uint8Array(bytesNum);
  for (let i=0; i < bytesNum; i++) {
    data[i] = parseInt(s.substr(i*2, 2), 16);
  }
  return data;
}

function stringToBytes(s){
  return new TextEncoder('utf-8').encode(s);
}

function concatBytes(a, b){
  let c = new Uint8Array(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

function bytesToHex(buf){
  return [...new Uint8Array(buf)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')
}

export { 
  bytesToHex,
  concatBytes,
  hexToBytes,
  stringToBytes,
}
