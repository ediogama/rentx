"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.DevolutionRentalUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const DayJsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");
const AppError_1 = require("@shared/errors/AppError");
let DevolutionRentalUseCase = class DevolutionRentalUseCase {
    constructor(rentalsRepository, carsRepository, dayJsDateProvider) {
        this.rentalsRepository = rentalsRepository;
        this.carsRepository = carsRepository;
        this.dayJsDateProvider = dayJsDateProvider;
    }
    execute({ id, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield this.rentalsRepository.findById(id);
            const car = yield this.carsRepository.findById(rental.car_id);
            const minimum_daily = 1;
            if (!rental) {
                throw new AppError_1.AppError("Rental does not exists");
            }
            const dateNow = this.dayJsDateProvider.dateNow();
            let daily = this.dayJsDateProvider.compareInDays(rental.start_date, this.dayJsDateProvider.dateNow());
            if (daily <= 0) {
                daily = minimum_daily;
            }
            const delay = this.dayJsDateProvider.compareInDays(dateNow, rental.expected_return_date);
            let total = 0;
            if (delay > 0) {
                const calculate_fine = delay * car.fine_amount;
                total = calculate_fine;
            }
            total += daily * car.daily_rate;
            rental.end_date = this.dayJsDateProvider.dateNow();
            rental.total = total;
            yield this.rentalsRepository.create(rental);
            yield this.carsRepository.updateAvailable(car.id, true);
            return rental;
        });
    }
};
DevolutionRentalUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RentalsRepository")),
    __param(1, (0, tsyringe_1.inject)("CarsRepository")),
    __param(2, (0, tsyringe_1.inject)("DayJsDateProvider")),
    __metadata("design:paramtypes", [Object, Object, DayJsDateProvider_1.DayJsDateProvider])
], DevolutionRentalUseCase);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;
