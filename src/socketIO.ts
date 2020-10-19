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

let users: User[] = [];

/**
 * Events:
 * "connection"
 * "chat join"
 * "private room create"
 * "chat message"
 * "disconnect"
 * "success"
 * "error"
 * "update users"
 */

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat join", (name) => {
    users.push({
      id: socket.id,
      name,
    });
    socket.emit("success", "successfully joined chatroom!");
    io.emit("update users", users);
  });

  socket.on("private room create", (name) => {
    socket.join(socket.id);
    socket.emit("success", "successfully joined chatroom!");
    // io.emit("update users", users);
    io.to(socket.id).emit(`${name} joined the room!`);
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    const sender = users.find(user => user.id === socket.id);
    if(sender){
      io.emit("chat message", msg, sender.name);
    }else{
      io.emit("chat message", msg, "anonymous");
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user.id !== socket.id);
    io.emit("update users", users);
    console.log("user disconnected");
  });
});

export default io;
