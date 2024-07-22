import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUserAvatar,
} from "../controllers/User.controller.js";
import { upload } from "../middlewares/Multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

//Only for testing in POSTMAN
router.route("/logout").get(logoutUser);

export default router;
