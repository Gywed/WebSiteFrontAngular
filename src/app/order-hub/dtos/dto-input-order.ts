import {DtoInputOrderContent} from "./dto-input-order-content";

export interface DtoInputOrder {
  id : number,
  date : string,
  totalOrderPrice : number
  orderContents : DtoInputOrderContent[]
}
