import {DtoOutputPaginationParameters} from "../../dtos/dto-output-pagination-parameters";

export interface DtoOutputEmployeeFilteringParameters {
  surname?: string,
  lastname?: string,
  dtoPagination: DtoOutputPaginationParameters
}
