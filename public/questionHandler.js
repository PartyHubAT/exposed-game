class QuestionHandler {
  constructor(mongoose, CATEGORY) {
    this.index = 0;
    this.loadQuestions(mongoose, CATEGORY);
  }

  loadQuestions(mongoose, CATEGORY) {
    this.questions = [
      "Question 1",
      "Question 2",
      "Question 3",
      "Qeustion 4",
      "Question 5",
      "Question 6",
    ];
    if (mongoose) {
      console.log("Loaded questions from db");
      const questionRepo = new (require("./question/QuestionRepo"))(mongoose);
      const questionService = new (require("./question/QuestionService"))(
        questionRepo
      );
      questionService.getAllQuestions(CATEGORY).then((result) => {
        const res = result.map((q) => q.question);
        this.questions = res.sort(() => 0.5 - Math.random());
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
    if (this.matches.length > this.questions.length) {
      this.matches = this.matches.slice(0, this.questions.length);
      console.log(
        "1 - " + this.matches.length + " -- " + this.questions.length
      );
    }
    if (this.questions.length > this.matches.length) {
      this.questions = this.questions.slice(0, this.matches.length);
      console.log(
        "2 - " + this.matches.length + " -- " + this.questions.length
      );
    }
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

  getEndResults() {
    return {
      matches: this.matches,
      questions: this.questions,
    };
  }
}

module.exports = QuestionHandler;
