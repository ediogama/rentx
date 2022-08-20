"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const EtherealMailProvider_1 = require("./implementations/EtherealMailProvider");
const SESMailProvider_1 = require("./implementations/SESMailProvider");
dotenv_1.default.config();
const mailProvider = {
    ethereal: tsyringe_1.container.resolve(EtherealMailProvider_1.EtherealMailProvider),
    ses: tsyringe_1.container.resolve(SESMailProvider_1.SESMailProvider),
};
tsyringe_1.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);
