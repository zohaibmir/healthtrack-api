export interface IRepository<T, K> {
    create(data: T): Promise<K>;
    findAll(): Promise<K[]>;
    findById(id: number): Promise<K | null>;
    update(id: number, data: T): Promise<K>;
    delete(id: number): Promise<void>;
  }
  