import socketIO from "socket.io";

const io = socketIO({
    serveClient: false
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("chat message", (msg: any) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export default io;