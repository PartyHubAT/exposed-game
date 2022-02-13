class QuestionHandler {
  constructor() {
    this.index = 0;
    this.setQuestions();
  }

  setQuestions() {
    this.questions = ["Question 1 ?", "Questions 2 ?"];
  }

  generateMatches(players) {
    this.matches = [];
    players.forEach((playerA) => {
      players.forEach((playerB) => {
        const matchAlreadyExists = this.matches.find(
          (m) => m.playerA == playerB && m.playerB == playerA
        );
        if (playerA != playerB && !matchAlreadyExists) {
          this.matches.push({
            playerA,
            playerB,
            votesA: [],
            votesB: [],
          });
        }
      });
    });
    this.matches = this.matches.sort(() => 0.5 - Math.random());
  }

  getMatch(index) {
    return this.matches[index];
  }

  getQuestion() {
    return {
      index: this.index,
      questionCount: this.index + 1,
      totalQuestionCount: this.questions.length,
      question: this.questions[this.index],
      match: this.getMatch(this.index),
    };
  }

  handleVote(player, vote) {
    const { index, isPlayerA } = vote;
    if (isPlayerA) this.matches[index].votesA.push(player);
    if (!isPlayerA) this.matches[index].votesB.push(player);
    return (
      this.matches[index].votesA.length + this.matches[index].votesB.length
    );
  }

  incrementIndex() {
    this.index++;
  }

  getResults() {
    console.log("getResults " + this.index);
    return this.matches[this.index];
  }
}

module.exports = QuestionHandler;
