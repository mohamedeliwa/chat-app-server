import app from "./app";
import io from './socketIO';

const port: number = 5000;


const server = app.listen(port, () => {
  console.log("listening on port 5000");
});

io.attach(server);
