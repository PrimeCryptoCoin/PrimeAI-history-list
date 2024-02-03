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
