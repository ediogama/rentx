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
exports.UsersRepository = void 0;
const data_source_1 = require("@shared/infra/typeorm/data-source");
const User_1 = require("../entities/User");
class UsersRepository {
    constructor() {
        this.usersRepository = data_source_1.PostgresDataSource.getRepository(User_1.User);
    }
    create({ name, password, email, driver_license, avatar, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.usersRepository.create({
                name,
                password,
                email,
                driver_license,
                avatar,
                id,
            });
            yield this.usersRepository.save(user);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.usersRepository.findOneBy({ email });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOneBy({ id });
            return user;
        });
    }
}
exports.UsersRepository = UsersRepository;
