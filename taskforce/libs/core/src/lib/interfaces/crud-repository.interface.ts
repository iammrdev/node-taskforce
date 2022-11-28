export interface CRUDRepository<Entity, Id, ReturnType> {
  create(item: Entity): Promise<ReturnType>;

  findById(id: Id): Promise<ReturnType | null>;

  update(id: Id, item: Entity): Promise<ReturnType>;

  delete(id: Id): Promise<void>;
}
