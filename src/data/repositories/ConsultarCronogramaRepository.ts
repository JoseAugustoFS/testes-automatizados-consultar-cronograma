import { IRepositoryFind } from "contracts/IRepository";
import { IBancoDeDados } from "data/dataBase/BancoDeDados";
import { ICronograma } from "domain/entities/Cronograma";



export class ConsultarCronogramaRepository implements IRepositoryFind<ICronograma> {

    bd: IBancoDeDados<ICronograma>;
    constructor(bd: IBancoDeDados<ICronograma>) {
        this.bd = bd;
    }

    findAll(): Promise<ICronograma[]> {
        try{
            let result = this.bd.query("SELECT * FROM cronograma;", null) as ICronograma[];
                if (!result) {
                    new Error("Nenhum cronograma encontrado");
                }
                if (result.length == 0) {
                    new Error("Nenhum cronograma encontrado");
                }
            return Promise.resolve(result as unknown as ICronograma[]);
        }catch(e){
            return Promise.resolve([]);
        }
    }

    findById(id: string): Promise<ICronograma | undefined> {

        try{
            let result = this.bd.query("SELECT * FROM cronograma where id =$id;", null) as ICronograma[];
            if (!result) {
                new Error("Nenhum cronograma encontrado");
            }
            if (result.length == 0) {
                new Error("Nenhum cronograma encontrado");
            }
            return Promise.resolve(result.shift() as unknown as ICronograma);
        }catch(e){
            return Promise.resolve(undefined);
        }

    }

}