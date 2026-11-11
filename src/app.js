const express = require("express");

function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/", (_req, res) => {
    res.status(200).json({
      service: "cicd-aws",
      message: "Express server is running",
    });
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "not found" });
  });

  return app;
}

module.exports = { createApp };
