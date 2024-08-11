const express = require("express");
const app = express();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: "djkqpnoks",
  api_key: "155629962549277",
  api_secret: "mZoZGehE0Mx4hHE3OqcXN13mV6w",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, true);
  }
}

app.use(multer({ storage, fileFilter }).single("image"));

app.post("/", (req, res) => {
  const { name } = req.body;
  console.log(name);
  // console.log(req.file);
  cloudinary.uploader.upload(`${req.file.path}`, (error, result) => {
    console.log(result, error);
  });
  res.send("Done");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("listening.......");
});
