<template>
  <div v-if="result">
    <div class="result">
      <div>
        <h1 :class="{ winner: result.votesA.length > result.votesB.length }">
          {{ result.votesA.length }} votes for {{ result.playerA.name }}
        </h1>
        <div
          v-for="vote in result.votesA"
          :key="vote"
          class="vote"
          :class="{ anonymousResults: $root.settings.anonymousResults }"
        >
          {{ vote.name }}
        </div>
      </div>
      <div>
        <h1 :class="{ winner: result.votesA.length < result.votesB.length }">
          {{ result.votesB.length }} votes for {{ result.playerB.name }}
        </h1>
        <div
          v-for="vote in result.votesB"
          :key="vote"
          class="vote"
          :class="{ anonymousResults: $root.settings.anonymousResults }"
        >
          {{ vote.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  mounted() {}
};
</script>
<style scoped>
.result {
  margin: 0 auto;
  display: grid;
  gap: 20px;
  width: 90%;
  grid-template-columns: repeat(2, 1fr);
  transition: 0.5 ease-in-out;
}
h1 {
  font-size: 1.4em;
  font-family: var(--font-header);
}
h1.winner {
  color: var(--secondary);
}
.result div.vote {
  font-family: var(--font-header);
  padding: 10px 10px;
  text-align: center;
  margin: 10px 0;
  border-radius: 5px;
  background: var(--dark);
  color: var(--light);
  transition: 0.5 ease-in-out;
}
.anonymousResults {
  color: var(--dark) !important;
}
</style>
