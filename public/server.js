/**
 * @param {EmitToAll} emitToAll
 * @param {EmitToOne} emitToOne
 * @param {EndGame} endGame
 * @param {Player[]} players
 * @param {Settings} settings
 * @return {GameServer}
 */
function initServerLogic(emitToAll, emitToOne, endGame, players, settings) {
  /**
   * @type {Map<PlayerId, GameData>}
   */
  const playerGameData = new Map();
  /**
   * @type {Text[]}
   */
  const doneTexts = [];

  /**
   * Checks if the game is complete
   * @return {boolean}
   */
  function gameIsDone() {
    return doneTexts.length === settings.textsPerPlayer * players.length;
  }

  /**
   * Gets the index of a player
   * @param {string} playerId The id of the player
   * @returns {number} The players index
   */
  function getPlayerIndex(playerId) {
    return players.findIndex((player) => player._id === playerId);
  }

  /**
   * Completes the game
   */
  function completeGame() {
    emitToAll("gameDone", { texts: doneTexts.map((it) => it.lines) });
  }

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
      /*
      players.forEach((player, index) => {
        emitToOne(player._id, "start", {});
      });*/
      emitToAll("start", {});
      emitToAll("exposedPlayerinfo", players);
    },
    events: {
      startWaiting(playerId) {
        const gameData = playerGameData.get(playerId);
        gameData.waiting = true;
      },
    },
  };
}

module.exports = initServerLogic;
