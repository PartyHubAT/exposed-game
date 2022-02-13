<template>
  <div v-if="question" class="questionContainer">
    <div
      class="countdown"
      :class="{ countdownWarn: votingTime <= 5 && votingTime != 0 }"
    >
      {{ votingTime }}
    </div>
    <div class="voteInfo">
      <span v-if="countAlreadyVoted > 0"
        >{{ countAlreadyVoted }} already voted!</span
      >
      <span v-if="countAlreadyVoted == 0">Nobody has voted yet!</span>
    </div>
    <span class="question">{{ question.question }}</span>
    <div class="voteButtons">
      <button
        @click="selectVote(question.match.playerA)"
        v-bind:class="{ selected: selectedVote === question.match.playerA }"
      >
        {{ question.match.playerA.name }}
      </button>
      <button
        @click="selectVote(question.match.playerB)"
        v-bind:class="{ selected: selectedVote === question.match.playerB }"
      >
        {{ question.match.playerB.name }}
      </button>
      <button class="confirm" @click="confirmVote()" :disabled="alreadyVoted">
        <span v-if="alreadyVoted">You already voted</span>
        <span v-if="!alreadyVoted">Confirm</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      countAlreadyVoted: 0,
      votingTime: 10,
      selectedVote: null,
      alreadyVoted: false,
      interval: null
    };
  },
  methods: {
    init() {
      this.countAlreadyVoted = 0;
      this.votingTime = this.$root.settings.votingTime;
      this.selectedVote = null;
      this.alreadyVoted = false;
      this.interval = setInterval(() => {
        if (this.votingTime != 0) this.votingTime--;
        if (this.votingTime == 0) clearInterval(interval);
      }, 1000);
    },
    clearTimeouts() {
      if (this.interval) clearInterval(this.interval);
    },
    selectVote(player) {
      if (this.alreadyVoted) return;
      this.selectedVote = player;
    },
    confirmVote() {
      if (this.selectedVote === null) return;
      this.alreadyVoted = true;
      const player = this.selectedVote;
      const voteObject = {
        index: this.question.index,
        isPlayerA: player._id === this.question.match.playerA._id ? true : false
      };
      this.$socket.emit("voteQuestion", voteObject);
    }
  },
  sockets: {
    voteUpdate(countAlreadyVoted) {
      this.countAlreadyVoted = countAlreadyVoted;
    }
  }
};
</script>

<style scoped>
.questionContainer {
  display: grid;
  justify-content: center;
}

.question {
  color: white;
  font-size: 1.5em;
  padding: 20px;
  font-style: italic;
  font-family: var(--font-header);
  text-align: center;
}

.voteInfo {
  text-align: center;
}

.voteButtons {
  display: grid;
  gap: 20px;
  min-width: 300px;
}

.voteButtons button {
  background-color: black;
  border: 0;
  padding: 10px;
  box-shadow: 5px 5px 1px var(--primary-dark);
  color: white;
  transition: 0.3s ease-in-out;
  border-radius: 5px;
}

.voteButtons button.selected {
  box-shadow: 5px 5px 1px var(--secondary);
  transform: scale(1.1);
}

.voteButtons .confirm {
  grid-column-start: 1;
  grid-column-end: 3;
}

.voteButtons .confirm:disabled {
  color: darkslategray;
}

.countdown {
  width: 50px;
  height: 50px;
  background: var(--secondary);
  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  font-size: 1.5em;
  position: absolute;
  color: var(--dark);
  top: 20px;
  right: 20px;
  transition: 0.3s ease-in-out;
  animation-name: countdownPulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  font-family: var(--font-header);
}

.countdownWarn {
  background: red;
  animation-name: countdownPulseWarn;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes countdownPulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

@keyframes countdownPulseWarn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .prompt {
    font-size: 30px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .prompt {
    font-size: 30px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .prompt {
    font-size: 40px;
  }
}
</style>
