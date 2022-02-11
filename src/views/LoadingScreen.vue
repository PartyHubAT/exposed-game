<template>
  <div id="content">
    <div class="title">exposed</div>
    <div class="subtitle">Waiting for players</div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  sockets: {
    start(data) {
      const {currentPlayer, players, matches} = data;
      this.$root.currentPlayer = currentPlayer;
      this.$root.players = players;
      setTimeout(() => this.$router.push("/exposed"), 3000);
    },
    exposedPlayerinfo(data) {
      console.log("exposedPlayerinfo");
      console.log(data);
    },
  },
};
</script>

<style scoped>
#content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: var(--font-header);
  text-shadow: -4px -4px 1px var(--dark);
  color: var(--light);
}
.subtitle {
  font-family: var(--font-content);
  color: var(--dark);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 20px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .title {
    font-size: 80px;
  }
  .subtitle {
    font-size: 20px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .title {
    font-size: 100px;
  }
  .subtitle {
    font-size: 25px;
  }
}

</style>
