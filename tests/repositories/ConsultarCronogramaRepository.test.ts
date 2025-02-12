import { ConsultarCronogramaRepository, IBancoDeDados } from "../../src/data/repositories/ConsultarCronogramaRepository";
import { ICronograma } from "domain/entities/Cronograma";

class FakeBancoDeDados implements IBancoDeDados<ICronograma>{
    query(sql: string, param: any): ICronograma[] | null {
        //throw new Error("Method not implemented.");
        return null;
    }
}

function makeSUT(opcao: string) {
    const bd = new FakeBancoDeDados();
    const repo = new ConsultarCronogramaRepository(bd);
    return { bd, repo };
}

describe('ConsultarCronogramaRepository', () => {

    it('deve instanciar ConsultarCronogramaRepository', () => {
        let { bd, repo } = makeSUT('1');
        expect(repo).toBeDefined();
    });

});