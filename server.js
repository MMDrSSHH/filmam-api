const http = require("http");
const app = require("./app");
require("dotenv").config();

const server = http.createServer(app);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
