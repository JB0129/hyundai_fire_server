const express = require("express");
const router = express.Router();
const {
  getGallerys,
  getGallery,
  postGallery,
  addGallery,
  patchGallery,
  deleteGallery,
} = require("./../controller/galleryController");

router.get("/", getGallerys);

router.get("/:id", getGallery);

router.post("/", postGallery);

router.patch("/:id/add", addGallery);

router.patch("/:id", patchGallery);

router.delete("/:id", deleteGallery);

module.exports = router;
