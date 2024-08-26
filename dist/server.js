"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const blogRoute_1 = __importDefault(require("./routes/blogRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api/v1/user', userRoute_1.default);
app.use('/api/v1', blogRoute_1.default);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
