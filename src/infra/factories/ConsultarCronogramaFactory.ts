import { ConsultarCronogramaUseCase } from "../../domain/usecases/ConsultarCronogramaUseCase";
import { ConsultarCronogramaController } from "../../controllers/ConsultarCronogramaController";
import { ConsultarCronogramaRepository } from "../../data/repositories/ConsultarCronogramaRepository";
import { BancoDeDados } from "../../data/dataBase/BancoDeDados";

export function factoryConsultarCronograma() {
    const repository = new ConsultarCronogramaRepository(new BancoDeDados);
    const useCase = new ConsultarCronogramaUseCase(repository);
    return new ConsultarCronogramaController(useCase);
}