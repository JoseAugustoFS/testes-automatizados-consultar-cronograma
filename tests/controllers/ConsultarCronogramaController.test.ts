import { ConsultarCronogramaController } from "../../src/controllers/ConsultarCronogramaController";
import { IUseCase } from "../../src/contracts/IUseCase";
import { IEntradaConsultarCronograma, ISaidaConsultarCronograma } from "../../src/domain/usecases/ConsultarCronogramaUseCase";
import { Request, Response } from "express";

class UseCaseFake implements IUseCase<IEntradaConsultarCronograma, ISaidaConsultarCronograma> {
    chamado: boolean = false;
    async perform(entrada: IEntradaConsultarCronograma): Promise<ISaidaConsultarCronograma> {
        return {
            cronograma: {
                disciplinaId: entrada.disciplinaId,
                atividades: [{ data: "2025-02-03", descricao: "Teste" }]
            }
        };
    }
}

class ResponseFake {
    statusCodeInformado: number = 0;
    jsonInformado: any = null;
    endChamado: boolean = false;
    
    status(code: number): ResponseFake {
        this.statusCodeInformado = code;
        return this;
    }
    
    json(data: any): ResponseFake {
        this.jsonInformado = data;
        return this;
    }

    end(): ResponseFake {
        this.endChamado = true;
        return this;
    }
}

function makeSUT() {
    const requestStub = {
        params: {
            disciplinaId: '1',
        },
    } as any as Request;
    const responseFake = new ResponseFake();
    const uc = new UseCaseFake();
    const controller = new ConsultarCronogramaController(uc);
    return { uc, controller, requestStub, responseFake };
}

describe('ControllerBasico', () => {
    
    it('deve instanciar ConsultarCronogramaController', () => {
        let { uc, controller, requestStub, responseFake } = makeSUT();
        expect(controller).toBeDefined();
    });

    it('deve chamar handle', async () => {
        let { uc, controller, requestStub, responseFake } = makeSUT();
        await controller.handle(requestStub, responseFake as any as Response);

        expect(responseFake.endChamado).toBe(true);
        expect(responseFake.statusCodeInformado).toBe(200);
        expect(responseFake.jsonInformado.mensagem).toBe('ConsultarCronogramaController.metodoBasico() chamado');
        expect(responseFake.jsonInformado.cronograma.atividades[0].data).toBe("2025-02-03");
        expect(responseFake.jsonInformado.cronograma.atividades[0].descricao).toBe("Teste");
        
    });
});