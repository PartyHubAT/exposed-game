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
  const CATEGORY = settings && settings.category ? settings.category : "normal";
  const VOTINGTIME = settings && settings.votingTime ? settings.votingTime : 10;
  const questionHandler = new QuestionHandler(mongoose, CATEGORY);

  let timeouts = [];

  function stopVoting(playerId, broadcast) {
    if (!playerId) return;
    if (!broadcast)
      emitToOne(playerId, "questionResults", questionHandler.getResults());
    if (broadcast) emitToAll("questionResults", questionHandler.getResults());
  }

  /**
   * Initializes the game-data
   */
  (function init() {
    players = JSON.parse(JSON.stringify(players));
    players[0].role = "HOST";
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
        let timeout = setTimeout(() => {
          stopVoting(playerId, false);
        }, 1000 * VOTINGTIME);
        timeouts.push(timeout);
      },
      getNextQuestion(playerId) {
        console.log(arguments);
        questionHandler.incrementIndex();
        emitToAll("nextQuestion", questionHandler.getQuestion());
        let timeout = setTimeout(() => {
          stopVoting(playerId, true);
        }, 1000 * VOTINGTIME);
        timeouts.push(timeout);
      },
      getEndResults() {
        emitToAll("endResults", questionHandler.getEndResults());
      },
      voteQuestion(playerId, voteObject) {
        console.log("voteQuestion");
        console.log(arguments);
        const player = players.find((p) => p._id === playerId);
        const voteUpdate = questionHandler.handleVote(player, voteObject);
        emitToAll("voteUpdate", voteUpdate);
        if (voteUpdate == players.length) {
          timeouts.forEach((t) => clearTimeout(t));
          setTimeout(() => stopVoting(playerId, true), 3000);
        }
      },
      returnToLobby() {
        endGame();
      },
    },
  };
}

module.exports = initServerLogic;
