import { Request, Response } from "express";
import { IUseCase } from "../contracts/IUseCase";
import { IEntradaConsultarCronograma, ISaidaConsultarCronograma } from "../domain/usecases/ConsultarCronogramaUseCase";

export interface IController {
    handle(req: Request, resp: Response): Promise<void>;
}

export class ConsultarCronogramaController implements IController {
    useCase: IUseCase<IEntradaConsultarCronograma, ISaidaConsultarCronograma>;

    constructor(useCase: IUseCase<IEntradaConsultarCronograma, ISaidaConsultarCronograma>) {
        console.log('ConsultarCronogramaController instanciado');
        this.useCase = useCase;
    }

    async handle(req: Request, resp: Response): Promise<void> {

        if (!this.validar(req)) {
            resp.status(400).json({ error: "disciplinaId é obrigatório" });
        } else {

            const { disciplinaId } = req.params;

            const dto_usecase: IEntradaConsultarCronograma = {
                disciplinaId: parseInt(disciplinaId as string),
            };

            const resposta: ISaidaConsultarCronograma = await this.useCase.perform(dto_usecase);
            console.log('Resposta UseCase', resposta.cronograma);

            const minha_resposta = {
                mensagem: 'ConsultarCronogramaController.metodoBasico() chamado',
                cronograma: resposta.cronograma,
            };

            try {
                resp.status(200).json(minha_resposta).end();
            } catch (error: any) {
                resp.status(500).json({ error: error.message });
            }

        }
    }

    private validar(req: Request): boolean {
        if(!req) {
            return false
        }
        const { disciplinaId } = req.params;
        if (!disciplinaId || typeof disciplinaId !== "number" || disciplinaId < 0 || disciplinaId % 1 !== 0) {
            return false;
        }
        return true;
    }
}