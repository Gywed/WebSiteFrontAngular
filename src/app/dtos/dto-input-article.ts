import {DtoInputCategory} from "./dto-input-category";
import {DtoInputBrand} from "./dto-input-brand";

export interface DtoInputArticle {
  id: number
  nametag : string
  price : number
  pricingType : number
  stock : number
  category : DtoInputCategory
  brand : DtoInputBrand
}
