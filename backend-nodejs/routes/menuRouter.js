var express = require('express')
var router = express.Router()
const multer = require("multer")
const menuController = require("../controllers/menuController")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/uploads", upload.single('image'), (req, res) => {
    const { file } = req
    res.send({
        file: file.originalname,
        path: file.path,
        image: req.file.path,
    })
})

//Create
router.post("/add", upload.single('image'), menuController.create);

// Retrieve all
router.get("/find-all", menuController.findAll);
router.get("/get-all", menuController.getAll);


// Retrieve a single with id
router.get("/find/:id", menuController.findMenuById);

// Delete a with id
router.delete("/delete/:id", menuController.deleteMenu);

// Update a with id
router.put("/update/:id", upload.single('image'), menuController.updateMenu);

// Retrieve a single with name
router.get("/menu/:nom", menuController.findMenuByName);

module.exports = router;