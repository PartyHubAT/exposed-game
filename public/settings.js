module.exports = {
  form: {
    votingTime: {
      type: "Number",
      displayName: "Voting time",
      label: "How much time will players have to vote?",
      min: 10,
      max: 120,
      required: true,
    },
    anonymousResults: {
      type: "Checkbox",
      displayName: "Anonymous results",
      label: "Which player voted how remains anonymous",
      required: true,
    },
  },
  /**
   * @type {Settings}
   */
  defaultValues: {
    votingTime: 10,
    anonymousResults: true,
  },
};
