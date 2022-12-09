import {DtoOutputOrderContent} from "./dto-output-order-content";

export interface DtoOutputOrder {
  takeDateTime:string,
  orderContents : DtoOutputOrderContent[]
}
