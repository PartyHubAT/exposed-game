<template>
  <router-view />
</template>
<script>
export default {
  created() {
    this.$socket.emit("gameLoaded", {});
  },
};
</script>
<style>
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background: linear-gradient(to right,
    var(--background-gradient-one),
    var(--background-gradient-two)
  );
}
</style>
