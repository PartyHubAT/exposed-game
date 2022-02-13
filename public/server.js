const QuestionHandler = require("./questionHandler");

/**
 * @param {EmitToAll} emitToAll
 * @param {EmitToOne} emitToOne
 * @param {EndGame} endGame
 * @param {Player[]} players
 * @param {Settings} settings
 * @return {GameServer}
 */
function initServerLogic(
  emitToAll,
  emitToOne,
  endGame,
  players,
  settings,
  mongoose
) {
  /*
  console.log("questions");
  const questionRepo = new (require("./question/QuestionRepo"))(mongoose);
  const questionService = new (require("./question/QuestionService"))(
    questionRepo
  );

  questionService.getAllQuestions().then((res) => {
    console.log(res);
  });
*/
  const questionHandler = new QuestionHandler();
  const VOTINGTIME = settings && settings.votingTime ? settings.votingTime : 10;

  function stopVoting(playerId, broadcast) {
    if (!broadcast)
      emitToOne(playerId, "questionResults", questionHandler.getResults());
    if (broadcast) emitToAll("questionResults", questionHandler.getResults());
  }

  /**
   * Initializes the game-data
   */
  (function init() {
    questionHandler.generateMatches(players);
  })();

  return {
    startGame() {
      console.log(" ---- PLAYERS ----");
      console.log(JSON.stringify(players));
      console.log("------------------------");
      players.forEach((player) => {
        emitToOne(player._id, "start", {
          currentPlayer: player,
          players,
          settings,
        });
      });
    },
    events: {
      getFirstQuestion(playerId) {
        emitToOne(playerId, "nextQuestion", questionHandler.getQuestion());
        setTimeout(() => {
          stopVoting(playerId, false);
        }, 1000 * VOTINGTIME);
      },
      getNextQuestion(playerId) {
        console.log(arguments);
        questionHandler.incrementIndex();
        emitToAll("nextQuestion", questionHandler.getQuestion());
        setTimeout(() => {
          stopVoting(playerId, true);
        }, 1000 * VOTINGTIME);
      },
      voteQuestion(playerId, voteObject) {
        const player = players.find((p) => p._id === playerId);
        const voteUpdate = questionHandler.handleVote(player, voteObject);
        emitToAll("voteUpdate", voteUpdate);
      },
    },
  };
}

module.exports = initServerLogic;
