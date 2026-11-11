const { createApp } = require("./app");

const port = Number(process.env.PORT) || 3000;
const app = createApp();

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`listening on ${port}`);
});

function shutdown(signal) {
  console.log(`received ${signal}, closing`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
