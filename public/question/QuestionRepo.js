/**
 * Stores and retrieves games
 */
class QuestionRepo {
  /**
   * Model of the game-type
   * @type {Model<Question>}
   */
  #questionModel = null;

  /**
   * Initialize a new game-repo
   * @param {module:mongoose} mongoose The mongoose instance used to connect to the database
   */
  constructor(mongoose) {
    this.#questionModel = require("./QuestionModel")(mongoose);
  }

  /**
   * Gets all games from the database
   * @return {Promise<Question[]>}
   */
  async getAll(category) {
    return this.#questionModel.find({ category: category }).exec();
  }
}

module.exports = QuestionRepo;
