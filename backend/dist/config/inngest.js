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
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inngest = void 0;
const inngest_1 = require("inngest");
const db_1 = require("./db");
const user_model_1 = require("../models/user.model");
// Create a client to send and receive events
exports.inngest = new inngest_1.Inngest({ id: "store" });
const syncUser = exports.inngest.createFunction({ id: "sync-user" }, { event: "clerk/user.created" }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ event }) {
    var _b;
    yield (0, db_1.connectDB)();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const newUser = {
        clerkId: id,
        email: (_b = email_addresses[0]) === null || _b === void 0 ? void 0 : _b.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        imageUrl: image_url,
        addresses: [],
        wishList: [],
    };
    yield user_model_1.User.create(newUser);
}));
const deleteUserFromDB = exports.inngest.createFunction({ id: "delete-user-from-db" }, { event: "clerk/user.delete" }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ event }) {
    yield (0, db_1.connectDB)();
    const id = event.data;
    yield user_model_1.User.deleteOne({ clerkId: id });
}));
// Create an empty array where we'll export future Inngest functions
exports.functions = [syncUser, deleteUserFromDB];
