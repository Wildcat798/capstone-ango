const express = require("express")
const router = express.Router()

const { userController } = require("../controllers")

router
	// .get("/signup", userController.signUp)
	.post("/signup", userController.processSignUp)

	// .get("/login", userController.login)
	.post("/login", userController.processLogin)

	.get("/login-status", userController.loginStatus)
	.post("/logout", userController.logout)

module.exports = router