import express from "express"
import { adminLogin, getAllUsers,logout } from "../controllers/admin.controler.js";
import isAthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();
router.post("/login", adminLogin);
router.get  ("/getallusers", getAllUsers);
router.get("/logout", isAthenticated, logout);


export default router;