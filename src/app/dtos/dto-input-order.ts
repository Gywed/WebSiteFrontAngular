import {DtoInputOrderContent} from "./dto-input-order-content";

export interface DtoInputOrder {
  id : number,
  creationDate : string,
  takeDateTime : string,
  totalOrderPrice : number,
  isFullyPrepared : boolean,
  orderContents : DtoInputOrderContent[]
}
