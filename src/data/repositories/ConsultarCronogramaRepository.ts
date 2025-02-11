import { IRepositoryFind } from "contracts/IRepository";
import { ICronograma } from "domain/entities/Cronograma";

export interface IBancoDeDados<T> {
    query(sql: string, param: any): T[] | null;
}

export class BancoDeDados implements IBancoDeDados<ICronograma> {
    query(sql: string, param: any): ICronograma[] | null {
        if (sql == "SELECT * FROM cronograma;") {
            return [
                {
                    disciplinaId: 1,
                    atividades: [
                        { data: "2025-02-03", descricao: "Teste 1" },
                        { data: "2025-02-03", descricao: "Teste 2" },
                        { data: "2025-02-03", descricao: "Teste 3" },
                        { data: "2025-02-03", descricao: "Teste 4" },
                        { data: "2025-02-03", descricao: "Teste 5" }
                    ]
                },
                {
                    disciplinaId: 2,
                    atividades: [
                        { data: "2025-02-04", descricao: "Atividade A" },
                        { data: "2025-02-04", descricao: "Atividade B" },
                        { data: "2025-02-04", descricao: "Atividade C" },
                        { data: "2025-02-04", descricao: "Atividade D" },
                        { data: "2025-02-04", descricao: "Atividade E" }
                    ]
                },
                {
                    disciplinaId: 3,
                    atividades: [
                        { data: "2025-02-05", descricao: "Revisão 1" },
                        { data: "2025-02-05", descricao: "Revisão 2" },
                        { data: "2025-02-05", descricao: "Revisão 3" },
                        { data: "2025-02-05", descricao: "Revisão 4" },
                        { data: "2025-02-05", descricao: "Revisão 5" }
                    ]
                },
                {
                    disciplinaId: 4,
                    atividades: [
                        { data: "2025-02-06", descricao: "Estudo 1" },
                        { data: "2025-02-06", descricao: "Estudo 2" },
                        { data: "2025-02-06", descricao: "Estudo 3" },
                        { data: "2025-02-06", descricao: "Estudo 4" },
                        { data: "2025-02-06", descricao: "Estudo 5" }
                    ]
                }
            ];
        } else if (sql == "SELECT * FROM cronograma where id = $id;") {
            return [{
                disciplinaId: 1,
                atividades: [
                    { data: "2025-02-03", descricao: "Teste 1" },
                    { data: "2025-02-03", descricao: "Teste 2" },
                    { data: "2025-02-03", descricao: "Teste 3" },
                    { data: "2025-02-03", descricao: "Teste 4" },
                    { data: "2025-02-03", descricao: "Teste 5" }
                ]
            }];
        } else {
            return null;
        }
    }

}

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