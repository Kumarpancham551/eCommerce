const authController = require("../controllers/auth.controller");
const {verifySignUp} = require("../middleware");
/**
 * Define for the user creation
 */

module.exports = (app)=>{
    app.post("/ecom/api/v1/auth/signup",[verifySignUp.checkDuplicateUserNameorEmail,verifySignUp.checkRolesExisted], authController.signup);
    app.post("/ecom/api/v1/auth/signin", authController.signin);
}