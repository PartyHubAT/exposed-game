<template>
  <div id="infoBar">
    <span v-for="player in $root.players" :key="player">
      {{ player._id }}
    </span>
  </div>
</template>
<script>
export default {
  name: "PlayerBar",
  props: {
    players: {
      type: Object,
      required: true
    }
  },
  sockets: {}
};
</script>

<style scoped>
#infoBar {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: beige;
}
#infoBar span {
  margin: 0 5px;
  font-size: 0.5em;
}
</style>
