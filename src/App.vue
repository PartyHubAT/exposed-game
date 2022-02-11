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
/*
  background: linear-gradient(to right,
    var(--background-gradient-one),
    var(--background-gradient-two)
  );
*/
  background: linear-gradient(-45deg, #080808, #2d2d2d, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
}
</style>
