import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(specificationName: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === specificationName);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) => ids.includes(specification.id));

    return specifications;
  }
  async list(): Promise<Specification[]> {
    return this.specifications;
  }
}

export { SpecificationsRepositoryInMemory };
