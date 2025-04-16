import { IBancoDeDados } from "data/dataBase/BancoDeDados";
import { ConsultarCronogramaRepository } from "../../src/data/repositories/ConsultarCronogramaRepository";
import { ICronograma } from "domain/entities/Cronograma";

class FakeBancoDeDados implements IBancoDeDados<ICronograma> {
    private opcao: string;
    constructor(opcao: string) {
        this.opcao = opcao;
    }

    // Tornando o método query assíncrono e retornando uma Promise
    async query(sql: string, param: any): Promise<ICronograma[] | null> {
        // Simulação de comportamento de banco
        if (this.opcao == '1') {
            return [{
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
            }];
        } else if (this.opcao == '2') {
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
        } else if (this.opcao == '3') {
            return null;
        } else if (this.opcao == '4') {
            return [];
        } else {
            throw new Error("Erro banco de dados");
        }
    }
}

function makeSUT(opcao: string) {
    const bd = new FakeBancoDeDados(opcao);
    const repo = new ConsultarCronogramaRepository(bd);
    return { bd, repo };
}

describe('ConsultarCronogramaRepository', () => {

    it('deve instanciar ConsultarCronogramaRepository', () => {
        let { bd, repo } = makeSUT('1');
        expect(repo).toBeDefined();
    });

    it('deve chamar o findAll', async () => {
        let { bd, repo } = makeSUT('1');
        let saida = await repo.findAll();
        expect(saida).toEqual([{
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
        }]);
    });

    it('deve chamar o findById', async () => {
        let { bd, repo } = makeSUT('2');
        let saida = await repo.findById("teste");
        expect(saida).toEqual({
            disciplinaId: 1,
            atividades: [
                { data: "2025-02-03", descricao: "Teste 1" },
                { data: "2025-02-03", descricao: "Teste 2" },
                { data: "2025-02-03", descricao: "Teste 3" },
                { data: "2025-02-03", descricao: "Teste 4" },
                { data: "2025-02-03", descricao: "Teste 5" }
            ]
        });
    });

    it('deve chamar o findAll e receber undefined', async () => {
        let { bd, repo } = makeSUT('3');
        let saida = await repo.findAll();
        expect(saida).toEqual([]);
    });

    it('deve chamar o findById e receber undefined', async () => {
        let { bd, repo } = makeSUT('3');
        let saida = await repo.findById("teste");
        expect(saida).toEqual(undefined);
    });

    it('deve chamar o findAll e receber um array vazio', async () => {
        let { bd, repo } = makeSUT('4');
        let saida = await repo.findAll();
        expect(saida).toEqual([]);
    });

    it('deve chamar o findById e receber um array vazio', async () => {
        let { bd, repo } = makeSUT('4');
        let saida = await repo.findById("teste");
        expect(saida).toEqual(undefined);
    });

    it('deve chamar o findAll e receber um erro', async () => {
        let { bd, repo } = makeSUT('5');
        let saida = await repo.findAll();
        expect(saida).toEqual([]);
    });

    it('deve chamar o findById e receber um erro', async () => {
        let { bd, repo } = makeSUT('5');
        let saida = await repo.findById("teste");
        expect(saida).toEqual(undefined);
    });

});