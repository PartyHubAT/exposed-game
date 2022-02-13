class QuestionService {
  /**
   * The repo used to store and retrieve games
   * @type {QuestionRepo}
   */
  #questionRepo;

  /**
   * Initializes a new game-service
   * @param {QuestionRepo} questionRepo The repo used to store and retrieve games
   */
  constructor(questionRepo) {
    this.#questionRepo = questionRepo;
  }

  /**
   * Gets all question
   * @returns {Promise<Question[]>} The questions
   */
  async getAllQuestions() {
    return await this.#questionRepo.getAll();
  }
}

module.exports = QuestionService;
