import app from "./app";
import socketIO from "socket.io";

const port: number = 3000;

// app.listen(port, () => {
//   console.log("Server Started at Port, 3000");
// });

const server = app.listen(port, () => {
  console.log("listening on port 3000");
});

const io = socketIO(server);

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
