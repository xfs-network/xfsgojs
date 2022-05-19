const xfsgojs = require('../dist/xfsgojs.min.js');
const BN = require('bn.js')
const { Contract, JsonRpc } = xfsgojs;

const contractObj = {
  bin: '0xd02301',
  abi: {"0x0000000000000000000000000000000000000000000000000000000000000000":{"name":"Create","argc":4,"args":[{"type":"CTypeString"},{"type":"CTypeString"},{"type":"CTypeUint8"},{"type":"CTypeUint256"}]},"0x03f4098a5e9d39a5104a34a4a19025c1cefd1551ebaedb871af3bcc12250f295":{"name":"GetTotalSupply","argc":0,"args":[]},"0x06d94b184b83928e43b59578e05a25d7c13e0e8b135b7657f15b1eb918e5dbcd":{"name":"GetStateTree","argc":0,"args":[]},"0x1162f326f21ac342307b16730bc30e1cfb6fd35acfd527a2d6adf39d44b56522":{"name":"GetName","argc":0,"args":[]},"0x2561555cf5bdc523a9cdcbb7810211f424a3477c8e4ae5773e6a37475247d78a":{"name":"TransferFrom","argc":3,"args":[{"type":"Address"},{"type":"Address"},{"type":""}]},"0x2b99b4d70435e95aac2a5b0fe9f1286ac033b46dec731828b7de558a17d869f5":{"name":"Allowance","argc":2,"args":[{"type":"Address"},{"type":"Address"}]},"0x4afeb91bae66dec2705fd2ac7eb3203276f67ce41f0171be8e1434d1450c3fc7":{"name":"GetAddress","argc":0,"args":[]},"0x5b4b1fef156061afef06adbd792185bad40d2f53393e3e05bfd00ed15ce6669b":{"name":"SetAddress","argc":1,"args":[{"type":"Address"}]},"0x6007acbe30b2cd98703e83350ea665c06009fcd51f26dd73b309294235f45f21":{"name":"Approve","argc":2,"args":[{"type":"Address"},{"type":""}]},"0x61945fbcd9ffbebe7dcf1ec99e8bd195e6b235295dbe5f84df2f8a2b72174e1c":{"name":"BalanceOf","argc":1,"args":[{"type":"CTypeAddress"}]},"0xb00e879ffa3a243b7b964ad38c7616c1ee2d027dc05a6c11569a737f9a700a53":{"name":"GetDecimals","argc":0,"args":[]},"0xc43a0419aead2a74559f03bd18e2dc17c80ef66c7ae4a51fbe7c284694c678a7":{"name":"SetStateTree","argc":1,"args":[{"type":"StateTree"}]},"0xd24b7074b8d5ee3e7e0a471901324f6870e175419253f5e497b42272f6919234":{"name":"GetSymbol","argc":0,"args":[]},"0xdde8bef78cbb720683fa1fe76bfb900592099ed4346ed995bcbc514e9aa67256":{"name":"Transfer","argc":2,"args":[{"type":"Address"},{"type":"CTypeUint256"}]}}
};
const stdToken = new Contract(contractObj.bin, contractObj.abi);
let totalSupply = new BN('123');
const args = ['fixcoin','fixcoin', 18, totalSupply];
stdToken.deploy(args);
stdToken.exec('GetName', []);
