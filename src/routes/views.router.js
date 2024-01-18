const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.render("index", {titulo: "Desafio 04"});
  })

module.exports = router;