import { IRepositoryFind } from "contracts/IRepository";
import { IBancoDeDados } from "data/dataBase/BancoDeDados";
import { ICronograma } from "domain/entities/Cronograma";



export class ConsultarCronogramaRepository implements IRepositoryFind<ICronograma> {

    bd: IBancoDeDados<ICronograma>;
    constructor(bd: IBancoDeDados<ICronograma>) {
        this.bd = bd;
    }

    async findAll(): Promise<ICronograma[]> {
        try{
            let result = await this.bd.query("SELECT * FROM cronograma;", null);
            if (!result) {
                new Error("Nenhum cronograma encontrado");
            }else{
                if (result.length == 0) {
                    new Error("Nenhum cronograma encontrado");
                }
                return Promise.resolve(result as unknown as ICronograma[]);
            }
            return Promise.resolve([]);
        }catch(e){
            return Promise.resolve([]);
        }
    }

    async findById(id: string): Promise<ICronograma | undefined> {

        try{
            let result = await this.bd.query("SELECT * FROM cronograma where id = $id;", id);
            if (!result) {
                new Error("Nenhum cronograma encontrado");
            }else{
                if (result.length == 0) {
                    new Error("Nenhum cronograma encontrado");
                }
                return Promise.resolve(result.shift() as unknown as ICronograma);
            }
        }catch(e){
            return Promise.resolve(undefined);
        }

    }

}