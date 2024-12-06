const http = require("http");
const scaffoldApp = require("./app");
require("dotenv").config();

const main = async () => {
  const app = await scaffoldApp();
  const server = http.createServer(app);

  const port = process.env.PORT;
  server.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
  });
};

main();
