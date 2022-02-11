<template>
  <div class="content">
    <router-link to="/">Start</router-link>
    <h1>{{ $root.currentPlayer._id }}</h1>

    <Question v-if="currentQuestion" :question="currentQuestion" />
    <PlayerBar v-if="$root.players" :players="$root.players" />
  </div>
</template>

<script>
import Question from "../components/Question";
import PlayerBar from "../components/PlayerBar";
export default {
  name: "GamePanel",
  components: { Question, PlayerBar },
  data() {
    return {
      currentQuestion: null
    };
  },
  computed: {},
  methods: {},
  sockets: {
    start(data) {
      console.log("start");
      console.log(arguments);
      const { currentPlayer, players, matches } = data;
      this.$root.currentPlayer = currentPlayer;
      this.$root.players = players;
    },
    nextQuestion(data) {
      console.log(data);
      this.currentQuestion = data;
      const { id, totalQuestionCount, question, match } = data;
    }
  },
  mounted() {
    this.$socket.emit("getNextQuestion", this.$root.currentPlayer._id);
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  left: 0;
  top: 0;
  font-family: var(--font-header);
  color: var(--primary);
  margin: var(--space-small);
  font-size: 25px;
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lastLine {
  font-family: var(--font-content);
  color: white;
  text-align: center;
  word-wrap: anywhere;
}

.waitText {
  font-family: var(--font-content);
  color: white;
  text-align: center;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 80%;
  }

  .lastLine {
    width: 90%;
    font-size: 20px;
    margin-bottom: var(--space-medium);
  }

  .waitText {
    font-size: 20px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 60%;
  }

  .lastLine {
    width: 80%;
    font-size: 20px;
    margin-bottom: var(--space-medium);
  }

  .waitText {
    font-size: 40px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .input-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
  }

  .text-input {
    flex-grow: 1;
  }

  .lastLine {
    font-size: 20px;
    margin-bottom: var(--space-medium);
  }

  .waitText {
    font-size: 40px;
  }
}
</style>
