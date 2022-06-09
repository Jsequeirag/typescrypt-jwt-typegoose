"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authControllers_1 = require("../controllers/authControllers");
router.post("/signin", authControllers_1.signIn);
router.post("/signup", authControllers_1.signUp);
router.get("/profile", authControllers_1.profile);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map