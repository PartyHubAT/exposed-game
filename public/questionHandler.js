class QuestionHandler {
  constructor() {
    this.index = 0;
    this.setQuestions();
    //this.generateMatches();
  }

  setQuestions() {
    this.questions = ["Question 1 ?", "Questions 2 ?"];
  }

  setVotes() {}

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
      totalQuestionCount: this.questions.length,
      question: this.questions[this.index],
      match: this.getMatch(this.index),
    };
  }

  handleVote(playerId, vote) {
    const { index, voteFor, isPlayerA } = vote;
    if (isPlayerA) this.matches[index].votesA.push(voteFor);
    if (!isPlayerA) this.matches[index].votesB.push(voteFor);
    return (
      this.matches[index].votesA.length + this.matches[index].votesB.length
    );
  }
}

module.exports = QuestionHandler;
