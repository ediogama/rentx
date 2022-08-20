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
exports.CarsRepository = void 0;
const data_source_1 = require("@shared/infra/typeorm/data-source");
const Car_1 = require("../entities/Car");
class CarsRepository {
    constructor() {
        this.repository = data_source_1.PostgresDataSource.getRepository(Car_1.Car);
    }
    findByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield this.repository.findOneBy({ license_plate });
            return car;
        });
    }
    create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = this.repository.create({
                brand,
                category_id,
                daily_rate,
                description,
                fine_amount,
                license_plate,
                name,
                specifications,
                id,
            });
            yield this.repository.save(car);
            return car;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield this.repository.findOneBy({ id });
            return car;
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository
                .createQueryBuilder()
                .update()
                .set({ available })
                .where("id = :id")
                .setParameters({ id })
                .execute();
        });
    }
    findAllAvailable(name, category_id, brand) {
        return __awaiter(this, void 0, void 0, function* () {
            const carsQuery = this.repository.createQueryBuilder("car").where("available = :available", { available: true });
            if (brand) {
                carsQuery.andWhere("car.brand = :brand", { brand });
            }
            if (name) {
                carsQuery.andWhere("car.name = :name", { name });
            }
            if (category_id) {
                carsQuery.andWhere("car.category_id = :category_id", { category_id });
            }
            const cars = yield carsQuery.getMany();
            return cars;
        });
    }
}
exports.CarsRepository = CarsRepository;
