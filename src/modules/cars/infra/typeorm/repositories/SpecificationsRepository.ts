import { In, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { PostgresDataSource } from "@shared/infra/typeorm/data-source";

import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = PostgresDataSource.getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specifications.findBy({ id: In(ids) });

    return specifications;
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

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specifications.create({
      name,
      description,
    });

    await this.specifications.save(specification);

    return specification;
  }
}

export { SpecificationsRepository };
