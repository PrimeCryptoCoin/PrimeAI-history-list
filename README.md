# primeai-history-list

A human understandable list of in or outgoing transactions

## What do we mean by human understandable?

Example.
Alice transfer one LEMONADE token to Bob.
Now Alice expects her history to show that she sent one LEMONADE token to Bob.

Technically, a transaction has been broadcasted on the network.
That transaction typically contains

- One or more unspent transaction outputs (UTXOs) to cover the miner fee, Alice needs to pay some PrimeAI to send an asset.
- One or more UTXOs for the LEMONADE transfer, like input 20 LEMONADE, output one to BOB and 19 back to a change address.

## Install

`npm install @primeaiproject/primeai-history-list`

## How to use

As a developer, you have to ask a Primeai node for the address deltas (getaddressdelta).
The address deltas represents everything that has come in and out from your addresses.

`  import {getHistory } from "@primeaiproject/primeai-history-list";`

OK so you invoke the method getHistory with deltas as argument.
`const history = getHistory(deltas);`
`history` is a list.
Each item in the list represents a transaction in or out of the wallet (list of addresses).
An item in the history list has an `assets` property.
`assets`is a list with objects of type {assetName, value, satoshis}
For example

```
"assets": [
      { "assetName": "LEMONADE", "satoshis": 1000000000, "value": 10 }
    ]
```

### Example user received 5 PrimeAI

```
 {
    "isSent": false,
    "fee": 0,
    "assets": [{ "assetName": "PrimeAI", "satoshis": 500000000, "value": 5 }],
    "blockHeight": 914584,
    "transactionId": "4729236e883325878665a3d5bb989de3a65341f3c6d7a43b4ce58522773f2548"
  }
```

### Example user sent 1 LEMONADE token

```
 {
  "assets": [
    { "assetName": "LEMONADE", "satoshis": -100000000, "value": -1 }
  ],
  "blockHeight": 914603,
  "transactionId": "1c776b263ad75d46f25d19b5330882fad020a46e220799877b982ff2c259a3be",
  "isSent": true,
  "fee": 0
}
```

Unfortunately, it looks like the user intentionally sent 0.01 PrimeAI, that is not true, that was the transaction fee.
This will be fixed in a later version

## Example how to use

Checkout example.js

```
const { getHistory } = require("../primeai-history-list"); //Replace with  @primeaiproject/primeai-history-list
const aliceDeltas = require("./example/alice_deltas_after_sending.json");

const history = getHistory(aliceDeltas);
const stuff = [];
for (let item of history) {
  item.assets.map((asset) => {
    asset.transactionId = item.transactionId.substring(0, 10) + "..";
    stuff.push(asset);
  });
}
console.table(stuff);

```

![image](https://user-images.githubusercontent.com/9694984/215324239-95632d7f-447b-424d-8cbf-c16cf2533b49.png)
