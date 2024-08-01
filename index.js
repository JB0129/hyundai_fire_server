const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// Express 내장 미들웨어인 express.json()을 적용
app.use(express.json({ strict: false }));

app.get("/", (req, res) => {
  res.status(200).send("Hyundai Fire server");
});

const notice = require("./router/noticeRouter");
app.use("/notice", notice);

const gallery = require("./router/galleryRouter");
app.use("/gallery", gallery);

const port = 8080;
const server = app.listen(port, () => {
  console.log(`[RUN] Hyundai Fire Server... | http://localhost:${port}`);
});
