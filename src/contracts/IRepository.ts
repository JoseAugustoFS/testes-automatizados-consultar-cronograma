export interface IRepository<E> {
    findAll(): Promise<E[]>;
    findById(id: string): Promise<E | undefined>;
    create(id: string, obj: E): Promise<E>;
    update(id: string, obj: E): Promise<E>;
    delete(id: string): Promise<boolean>;
}

export interface IRepositoryFind<E> {
    findAll(): Promise<E[]>;
    findById(id: string): Promise<E | undefined>;
}

export interface IRepositoryCreate<E> {
    create(id: string, obj: E): Promise<E>;
}

export interface IRepositoryUpdate<E> {
    update(id: string, obj: E): Promise<E>;
}

export interface IRepositoryDelete<E> {
    delete(id: string): Promise<boolean>;
}