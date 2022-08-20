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
exports.RentalsRepository = void 0;
const data_source_1 = require("@shared/infra/typeorm/data-source");
const Rental_1 = require("../entities/Rental");
class RentalsRepository {
    constructor() {
        this.repository = data_source_1.PostgresDataSource.getRepository(Rental_1.Rental);
    }
    create({ car_id, expected_return_date, user_id, end_date, id, total }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = this.repository.create({
                car_id,
                expected_return_date,
                user_id,
                id,
                end_date,
                total,
            });
            yield this.repository.save(rental);
            return rental;
        });
    }
    findById(id) {
        return this.repository.findOneBy({ id });
    }
    findByUserId(user_id) {
        return this.repository.find({ where: { user_id }, relations: ["car"] });
    }
    findOpenRentalByUser(user_id) {
        return this.repository.findOne({ where: { user_id, end_date: null } });
    }
    findOpenRentalByCar(car_id) {
        return this.repository.findOne({ where: { car_id, end_date: null } });
    }
}
exports.RentalsRepository = RentalsRepository;
