const History = require("../primeai-history-list"); //Yes we are importing our self
const aliceDeltas = require("./example/alice_deltas_after_sending.json");

test("Check sent one LEMONADE", () => {
  const history = History.getHistory(aliceDeltas);
  require("fs").writeFileSync("./history.json", JSON.stringify(history));

  //The first history item should contain Alice sending one Lemonade token to Bob
  const historyItem = history[0];
  console.log("Fist history fee", historyItem.fee / 1e8);
  const lemonade = historyItem.assets.find((a) => a.assetName === "LEMONADE");
  expect(lemonade).toBeTruthy();
  expect(lemonade.value).toBe(-1);

  const primeai = historyItem.assets.find((a) => a.assetName === "PrimeAI");
  expect(primeai).toBeFalsy();
  return;
});
