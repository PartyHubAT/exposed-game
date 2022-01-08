<template>
  <div>
    <h1>Demo game</h1>
    <h2>Number</h2>
    <p>{{ num }}</p>
    <button @click="bump">Bump</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    bump() {
      this.num++;
      this.$socket.emit("changeNum", { num: this.num });
    },
  },
  sockets: {
    numChanged(data) {
      this.num = data.num;
    },
  },
};
</script>

<style></style>
