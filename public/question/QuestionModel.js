/**
 * Initializes the model for games
 * @param {module:mongoose} mongoose The mongoose instance on this server
 * @returns {Model<Question>} The model
 */
module.exports = (mongoose) => {
  const schema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  });
  return (
    mongoose.models.Questions ||
    mongoose.model("Questions", schema, "questions")
  );
};
