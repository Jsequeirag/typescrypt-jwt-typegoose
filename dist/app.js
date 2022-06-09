"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* -------------------------------- packages -------------------------------- */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
/* ------------------------------- middlewares ------------------------------ */
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
/* --------------------------------- routes --------------------------------- */
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
app.use("/auth", authRoutes_1.default);
/* ---------------------------------database and server --------------------------------- */
app.use("/", (req, res) => {
    res.json({ message: "hello world! " });
});
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/basura")
    .then((res) => {
    app.listen(3000, () => {
        console.log("server:3000");
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map