import { ConsultarCronogramaUseCase } from "../../domain/usecases/ConsultarCronogramaUseCase";
import { ConsultarCronogramaController } from "../../controllers/ConsultarCronogramaController";
import { BancoDeDados, ConsultarCronogramaRepository } from "../../data/repositories/ConsultarCronogramaRepository";

export function factoryConsultarCronograma() {
    const repository = new ConsultarCronogramaRepository(new BancoDeDados);
    const useCase = new ConsultarCronogramaUseCase(repository);
    return new ConsultarCronogramaController(useCase);
}