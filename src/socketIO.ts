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
 * "private room join"
 * "chat message"
 * "disconnect"
 * "success"
 * "error"
 * "update users"
 */

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat join", (name: string) => {
    users.push({
      id: socket.id,
      name,
    });
    socket.emit("success", "successfully joined chatroom!");
    io.emit("update users", users);
  });

  socket.on("private room create", (name: string) => {
    socket.join(socket.id);
    socket.emit("success", "successfully joined chatroom!");
    // io.emit("update users", users);
    io.to(socket.id).emit("chat message", `${name} joined the room!`, "server");
  });

  socket.on("private room join", (id: string, name: string) => {
    socket.join(id);
    socket.emit("success", "successfully joined chatroom!");
    // io.emit("update users", users);
    io.to(id).emit("chat message", `${name} joined the room!`, "server");
  });

  socket.on("chat message", (msg: string, username?: string) => {
    // console.log("message: " + msg);
    const sender = users.find((user) => user.id === socket.id);
    if (sender) {
      io.emit("chat message", msg, sender.name);
    } else if (username) {
      io.emit("chat message", msg, username);
    } else {
      io.emit("chat message", msg, "anonymous");
    }
  });

  socket.on("disconnecting", () => {
    // console.log(socket);
    const rooms = Object.keys(socket.rooms);
    rooms.forEach(room => {
      io.to(room).emit("chat message", 'a user left the chat' ,"server")
    })
    
  })

  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("update users", users);
    console.log("user disconnected");
  });
});

export default io;
