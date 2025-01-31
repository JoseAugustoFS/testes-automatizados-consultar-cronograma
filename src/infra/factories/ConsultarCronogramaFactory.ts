import { ConsultarCronogramaUseCase } from "../../domain/usecases/ConsultarCronogramaUseCase";
import { ConsultarCronogramaController } from "../../controllers/ConsultarCronogramaController";

export function factoryConsultarCronograma() {
    const useCase = new ConsultarCronogramaUseCase();
    return new ConsultarCronogramaController(useCase);
}