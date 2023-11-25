const express = require('express');
const router = express.Router();
const app = express();
const {login,signUp,dashboard} = require("../controller/userController")
const {checkAuth} = require("../middleware/checkAuth")
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))


// parse routerlication/json
router.use(bodyParser.json())
router.post('/signUp', signUp);
router.post('/login', login);

//write middlewate before going to dashboard route by (checkAuth) function inside the route.
router.get('/dashboard', checkAuth,dashboard);


module.exports = router;