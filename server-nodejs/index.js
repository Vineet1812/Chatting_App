const express = require("express");
const cors = require("cors");
const axios = require("axios");

const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const CHAT_ENGINE_PROJECT_ID = "0155e3ec-6cd4-4db2-81c2-b74ca8f07e85";
const CHAT_ENGINE_PRIVATE_KEY = "a7a4b79d-36f0-42ff-834f-5485167a1568";

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  // Store a user-copy on Chat Engine!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  // Fetch this user from Chat Engine in this project!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.use(express.static(path.join(__dirname, "../client-react/build")));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client-react/build/index.html"));
})
// vvv On port 3001!
app.listen(3001);
