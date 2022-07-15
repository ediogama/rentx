import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(specificationName: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
