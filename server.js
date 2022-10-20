const { ApiPromise, WsProvider } = require('@polkadot/api');

const cron = require("node-cron");
const express = require("express");
const fs = require('fs');
var path = require('path')

const app = express();

let bn= 1000;
let dev = 2;
let min1 = 0.1;
let max1 = 0.3;
let min2 = 0.1;
let max2 = 0.5;
let totPow1 = 0;
let totPow2 = 0;

let obj = {
  blockNumber: bn,
  devices: dev,
  table: []
};

cron.schedule("15 * * * * *", function () {
  console.log("starting");
  let pow1 = Math.random() * (max1 - min1) + min1;
  let pow2 = Math.random() * (max2 - min2) + min2;
  pow1 = pow1.toFixed(3)*1000;
  pow2 = pow2.toFixed(3)*1000;
  bn = bn + 10;
  totPow1 += pow1;
  totPow2 += pow2;

  obj = {"block": bn,"devices": dev,"address":["device-1","device-2"],"power":[totPow1,totPow2]};

  console.log(obj);

});

app.get('/robonomics', (req, res) => {
  res.header("Content-Type",'application/json');
  let json = JSON.stringify(obj);
  res.send(json);
  //res.sendFile(path.join(__dirname,'./data', 'robonomics.json'));
})

app.listen(3000, () => {
  console.log("application listening.....");
});