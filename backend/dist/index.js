"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const express_2 = require("@clerk/express");
const express_3 = require("inngest/express");
const inngest_1 = require("./config/inngest");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)());
app.use("/api/inngest", (0, express_3.serve)({ client: inngest_1.inngest, functions: inngest_1.functions }));
const __dirname = path_1.default.resolve();
app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "Hello Kumar",
    });
});
const PORT = env_1.ENV.PORT;
if (env_1.ENV.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../admin/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../admin", "dist", "index.html"));
    });
}
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
startServer();
// Export for vercel
exports.default = app;
