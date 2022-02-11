<template>
  <span class="question">{{ question.question }}</span>
  <span v-if="countAlreadyVoted > 0"
    >{{ countAlreadyVoted }} already voted!</span
  >
  <span class="countdown">{{ countdown }}</span>
  <div class="voteButtons">
    <button @click="vote(question.match.playerA)" class="redShadow">
      {{ question.match.playerA._id }}
    </button>
    <button @click="vote(question.match.playerB)" class="greenShadow">
      {{ question.match.playerB._id }}
    </button>
  </div>
</template>
<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      required: true
    },
    alreadyVoted: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return { countAlreadyVoted: 0, countdown: 30 };
  },
  mounted() {
    setInterval(() => {
      if (this.countdown != 0) this.countdown--;
      if (this.countdown == 0) this.voteEnd();
    }, 1000);
  },
  methods: {
    vote(player) {
      const voteObject = {
        index: this.question.index,
        voteFor: player._id,
        isPlayerA: player._id === this.question.match.playerA._id ? true : false
      };
      console.log("vote " + JSON.stringify(voteObject));
      this.$socket.emit("voteQuestion", voteObject);
    },
    voteEnd() {
      this.$socket.emit("voteEnd", {});
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
.question {
  color: white;
  font-size: 1.5em;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.voteButtons {
  display: flex;
  gap: 20px;
}

.voteButtons button {
  background-color: black;
  border: 0;
  padding: 10px;
  box-shadow: 5px 5px 1px rgb(231, 71, 71);
  color: white;
}

.voteButtons .greenShadow {
  box-shadow: 5px 5px 1px rgb(71, 231, 140);
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
