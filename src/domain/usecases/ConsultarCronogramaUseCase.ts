import { ICronograma } from "../entities/Cronograma";
import { IUseCase } from "../../contracts/IUseCase";

export interface IEntradaConsultarCronograma {
    disciplinaId: number;
}

export interface ISaidaConsultarCronograma {
    cronograma: ICronograma;
}

export class ConsultarCronogramaUseCase implements IUseCase<IEntradaConsultarCronograma, ISaidaConsultarCronograma> {
    constructor() {
        console.log('ConsultarCronogramaUseCase instanciado');
    }

    async perform(entrada: IEntradaConsultarCronograma): Promise<ISaidaConsultarCronograma> {

        const saida: ISaidaConsultarCronograma = {
            cronograma: {
                disciplinaId: entrada.disciplinaId,
                atividades: [
                    { data: "2025-02-03", descricao: "Trabalho" },
                    { data: "2025-02-10", descricao: "P1" }
                ]
            }
        };

        return saida;
    }
}