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
exports.UsersTokensRepository = void 0;
const data_source_1 = require("@shared/infra/typeorm/data-source");
const UsersTokens_1 = require("../entities/UsersTokens");
class UsersTokensRepository {
    constructor() {
        this.repository = data_source_1.PostgresDataSource.getRepository(UsersTokens_1.UsersTokens);
    }
    create({ expires_date, refresh_token, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTokens = this.repository.create({ expires_date, refresh_token, user_id });
            yield this.repository.save(userTokens);
            return userTokens;
        });
    }
    findByUserIdAndRefreshToken(user_id, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy({ user_id, refresh_token });
        });
    }
    findByRefreshToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy({ refresh_token });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
}
exports.UsersTokensRepository = UsersTokensRepository;
