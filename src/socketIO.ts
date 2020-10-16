import socketIO from "socket.io";

/** Types */
interface User {
  id: string;
  name: string;
}
/** End of Types */
const io = socketIO({
  serveClient: false,
});

const users: User[] = [];

/**
 * Events:
 * "connect"
 * "chat join"
 * "chat message"
 * "disconnect"
 * "success"
 * "error"
 * "update users"
 */

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat join", (name) => {
    console.log(name);
    console.log(socket.id);
    users.push({
      id: socket.id,
      name,
    });
    socket.emit("success", "successfully joined chatroom!");
    socket.emit("update users", users);
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export default io;
