const QuestionHandler = require("./questionHandler");

/**
 * @param {EmitToAll} emitToAll
 * @param {EmitToOne} emitToOne
 * @param {EndGame} endGame
 * @param {Player[]} players
 * @param {Settings} settings
 * @return {GameServer}
 */
function initServerLogic(emitToAll, emitToOne, endGame, players, settings) {
  const playerGameData = new Map();
  const questionHandler = new QuestionHandler();

  /**
   * Initializes the game-data
   */
  (function init() {
    players.forEach((player) => {
      playerGameData.set(player._id, {});
    });
  })();

  return {
    startGame() {
      questionHandler.generateMatches(players);
      players.forEach((player) => {
        emitToOne(player._id, "start", {
          currentPlayer: player,
          players,
        });
      });
    },
    events: {
      getNextQuestion(playerId) {
        emitToOne(playerId, "nextQuestion", questionHandler.getQuestion());
      },
      voteQuestion(playerId, voteObject) {
        const voteUpdate = questionHandler.handleVote(playerId, voteObject);
        emitToAll("voteUpdate", voteUpdate);
      },
    },
  };
}

module.exports = initServerLogic;
