class QuestionHandler {
  constructor(mongoose, CATEGORY) {
    this.index = 0;
    this.loadQuestions(mongoose, CATEGORY);
  }

  loadQuestions(mongoose, CATEGORY) {
    this.questions = ["Question 1 ?", "Questions 2 ?"];
    if (mongoose) {
      const questionRepo = new (require("./question/QuestionRepo"))(mongoose);
      const questionService = new (require("./question/QuestionService"))(
        questionRepo
      );
      questionService.getAllQuestions(CATEGORY).then((result) => {
        const res = result.map((q) => q.question);
        this.questions = res;
      });
    }
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
      totalQuestionCount: this.matches.length,
      question: this.questions[this.index],
      match: this.getMatch(this.index),
    };
  }

  handleVote(player, vote) {
    console.log("handleVote");
    console.log(arguments);
    const { index, isPlayerA } = vote;
    if (isPlayerA) this.matches[index].votesA.push(player);
    if (!isPlayerA) this.matches[index].votesB.push(player);
    return (
      this.matches[index].votesA.length + this.matches[index].votesB.length
    );
  }

  incrementIndex() {
    if (this.index < this.matches.length) this.index++;
  }

  getResults() {
    return this.matches[this.index];
  }
}

module.exports = QuestionHandler;
