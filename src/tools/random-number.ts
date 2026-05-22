import { tool, ParameterType } from "@optimizely-opal/opal-tools-sdk";

interface RandomNumberParameters {
  rangeMaximum: number;
  weighted?: boolean;
}

async function randomNumber(parameters: RandomNumberParameters) {
  const { rangeMaximum, weighted = false } = parameters;

  if (!Number.isInteger(rangeMaximum) || rangeMaximum <= 0) {
    throw new Error("rangeMaximum must be a positive integer");
  }

  const randomValue = weighted
    ? Math.pow(Math.random(), 2)
    : Math.random();

  const value = Math.floor(randomValue * rangeMaximum);

  return {
    value,
    weighted,
    rangeMaximum,
  };
}

tool({
  name: "random-number",
  description:
    "Returns a random integer from 0 to rangeMaximum - 1, optionally weighted toward lower values",
  parameters: [
    {
      name: "rangeMaximum",
      type: ParameterType.Number,
      description: "Exclusive upper bound for random integer generation",
      required: true,
    },
    {
      name: "weighted",
      type: ParameterType.Boolean,
      description: "When true, favors lower numbers more heavily",
      required: false,
    },
  ],
})(randomNumber);
