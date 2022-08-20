"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _tsyringe = require("tsyringe");

var _LocalStorageProvider = require("./implementations/LocalStorageProvider");

var _S3StorageProvider = require("./implementations/S3StorageProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const diskStorage = {
  local: _LocalStorageProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton("StorageProvider", diskStorage[process.env.DISK]);