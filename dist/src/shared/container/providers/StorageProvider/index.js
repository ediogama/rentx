"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const LocalStorageProvider_1 = require("./implementations/LocalStorageProvider");
const S3StorageProvider_1 = require("./implementations/S3StorageProvider");
dotenv_1.default.config();
const diskStorage = {
    local: LocalStorageProvider_1.LocalStorageProvider,
    s3: S3StorageProvider_1.S3StorageProvider,
};
tsyringe_1.container.registerSingleton("StorageProvider", diskStorage[process.env.DISK]);
