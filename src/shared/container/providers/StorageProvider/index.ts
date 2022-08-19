import dotenv from "dotenv";
import { container } from "tsyringe";

import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

dotenv.config();

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>("StorageProvider", diskStorage[process.env.DISK]);
