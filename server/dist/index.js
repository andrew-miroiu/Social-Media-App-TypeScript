"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const profileRouter_1 = __importDefault(require("./routes/profileRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const followRoute_1 = __importDefault(require("./routes/followRoute"));
const likeRoute_1 = __importDefault(require("./routes/likeRoute"));
const commentsRouter_1 = __importDefault(require("./routes/commentsRouter"));
const conversationRouter_1 = __importDefault(require("./routes/conversationRouter"));
const messagesRouter_1 = __importDefault(require("./routes/messagesRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*", // sau Netlify URL
    credentials: true
}));
app.use(express_1.default.json());
app.use('/posts', postRouter_1.default);
app.use('/profile', profileRouter_1.default);
app.use('/users', userRouter_1.default);
app.use('/follow', followRoute_1.default);
app.use('/like', likeRoute_1.default);
app.use('/comments', commentsRouter_1.default);
app.use('/conversation', conversationRouter_1.default);
app.use('/messages', messagesRouter_1.default);
app.get('/', (_, res) => res.send(' Server is running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on http://localhost:5000'));
