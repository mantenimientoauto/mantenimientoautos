const router = require("express").Router();
const {login} = require("../controllers/users");


router.post("/login",login);
router.post("/register" );
router.get("/logout" );



module.exports = router;