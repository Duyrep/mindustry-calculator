import pluralize from "pluralize";

[
  ["water", "water"],
  ["oil", "old"],
  ["slag", "slag"],
  ["Cryofluid", "Cryofluid"]
].forEach(([single, plural]) => {
  pluralize.addIrregularRule(single, plural);
});

export default pluralize;
