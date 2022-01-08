let num = 0;

module.exports = {
  register(socket, emitInRoom) {
    socket.emit("numChanged", { num });

    socket.on("changeNum", (data) => {
      num = data.num;
      emitInRoom("numChanged", { num });
    });
  },
};
