import app from "./app";
import io from './socketIO';

const port: number = 3000;


const server = app.listen(port, () => {
  console.log("listening on port 3000");
});

io.attach(server);
