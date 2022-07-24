import { Repository } from "typeorm";

import { PostgresDataSource } from "@database/data-source";
import { Specification } from "@modules/cars/entities/Specification";

import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = PostgresDataSource.getRepository(Specification);
  }
  async findByName(specificationName: string): Promise<Specification> {
    const specification = await this.specifications.findOneBy({
      name: specificationName,
    });

    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.specifications.find();

    return specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specifications.create({
      name,
      description,
    });

    await this.specifications.save(specification);
  }
}

export { SpecificationsRepository };
