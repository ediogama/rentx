import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;
  findAllAvailable(name?: string, category_id?: string, brand?: string): Promise<Car[]>;
}

export { ICarsRepository };
