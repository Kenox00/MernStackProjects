const { SignUp, Login } = require("../controllers/AuthController")
const { userVerification } = require("../middleware/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post('/',userVerification);

module.exports = router;