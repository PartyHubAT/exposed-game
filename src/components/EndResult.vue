<template>
  <div v-if="endResult">
    <div id="questions">
      <h1>Thanks for playing exposed!</h1>
      <h1>Most votes</h1>
      <apexchart
        v-if="options"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
      <ol>
        <li
          class="questions"
          v-for="(question, index) in endResult.questions"
          :key="question"
        >
          <div v-if="index < endResult.matches.length">
            <span class="question">{{ question }}</span>
            <span class="matchInfo"
              >{{ endResult.matches[index].playerA.name }} ({{
                endResult.matches[index].votesA.length
              }}) vs. {{ endResult.matches[index].playerB.name }} ({{
                endResult.matches[index].votesB.length
              }})</span
            >
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
  props: {
    endResult: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      categories: null,
      data: null,
      options: null,
      series: null
    };
  },
  methods: {
    initChartData() {}
  },
  mounted() {
    if (this.endResult) {
      let data = [];
      this.$root.players.forEach((player) => {
        data[player.name] = 0;
      });
      this.endResult.matches.forEach((match) => {
        data[match.playerA.name] += match.votesA.length;
        data[match.playerB.name] += match.votesB.length;
      });
      this.categories = Object.keys(data);
      this.data = [];
      this.categories.forEach((c) => {
        this.data.push(data[c]);
      });
      this.options = {
        plotOptions: {
          bar: {
            borderRadius: 15
          }
        },
        chart: {
          id: "x",
          width: "100%",
          fontFamily: "Helvetica, Arial, sans-serif"
        },
        xaxis: { categories: this.categories },
        colors: ["#0b0b0b"],
        grid: {
          show: false
        }
      };
      this.series = [{ name: "Votes", data: this.data }];
    }
    let charts = document.querySelector(".vue-apexcharts");
    document.querySelectorAll(".apexchartsx").forEach((e) => e.remove());
  }
};
</script>
<style scoped>
#questions {
  background: #c9971f;
  padding: 5px;
  border-radius: 5px;
  font-family: var(--font-header);
}
.question {
  color: white;
  font-family: var(--font-header);
}
.matchInfo {
  font-family: var(--font-header);
  display: block;
  margin-bottom: 10px;
  padding-left: 5px;
  font-size: 80%;
  border-left: 1px solid black;
}
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
