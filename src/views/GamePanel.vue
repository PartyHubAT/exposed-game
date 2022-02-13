<template>
  <div class="content">
    <router-link to="/">Start</router-link>
    <Question
      v-show="currentQuestion && !currentResult"
      :question="currentQuestion"
      ref="questionComponent"
      @initQuestion="init"
    />
    <Result
      v-show="currentResult"
      :result="currentResult"
      ref="resultComponent"
    />
    <InfoBar
      v-if="$root.players"
      :players="$root.players"
      :currentQuestion="currentQuestion"
    />
    <button
      class="nextButton"
      @click="nextQuestion()"
      v-if="currentResult"
      :disabled="$root.currentPlayer.role !== 'HOST'"
    >
      Next question
    </button>
  </div>
</template>

<script>
import Question from "../components/Question";
import Result from "../components/Result";
import InfoBar from "../components/InfoBar";
export default {
  name: "GamePanel",
  components: { Question, Result, InfoBar },
  data() {
    return {
      currentQuestion: null,
      currentResult: null
    };
  },
  computed: {},
  methods: {
    nextQuestion() {
      this.$socket.emit("getNextQuestion", this.$root.currentPlayer._id);
    }
  },
  sockets: {
    nextQuestion(data) {
      console.log("nextQuestion: " + JSON.stringify(data));
      this.$refs.questionComponent.init();
      this.currentResult = null;
      this.currentQuestion = data;
    },
    questionResults(data) {
      this.currentResult = data;
    }
  },
  mounted() {
    this.$socket.emit("getFirstQuestion", this.$root.currentPlayer._id);
  }
};
</script>

<style scoped>
.nextButton {
  background-color: black;
  border: 0;
  padding: 10px;
  box-shadow: 5px 5px 1px var(--primary-dark);
  color: white;
  transition: 0.3s ease-in-out;
  border-radius: 5px;
}

.nextButton:disabled {
  color: darkslategray;
}

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
