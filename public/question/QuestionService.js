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
  async getAllQuestions(category) {
    category = category.toLowercase();
    return await this.#questionRepo.getAll(category);
  }
}

module.exports = QuestionService;
