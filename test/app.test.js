const test = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../src/app");

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
}

test("GET /health returns ok", async () => {
  const server = await listen(createApp());
  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  } finally {
    await close(server);
  }
});

test("GET / names the service", async () => {
  const server = await listen(createApp());
  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      service: "cicd-aws",
      message: "Express server is running",
    });
  } finally {
    await close(server);
  }
});

test("unknown routes return 404", async () => {
  const server = await listen(createApp());
  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/missing`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "not found" });
  } finally {
    await close(server);
  }
});
