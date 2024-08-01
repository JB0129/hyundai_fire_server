const express = require("express");
const router = express.Router();
const {
  getNotices,
  getNotice,
  postNotice,
  patchNotice,
  deleteNotice,
} = require("./../controller/noticeController");

router.get("/", getNotices);

router.get("/:id", getNotice);

router.post("/", postNotice);

router.patch("/:id", patchNotice);

router.delete("/:id", deleteNotice);

module.exports = router;
