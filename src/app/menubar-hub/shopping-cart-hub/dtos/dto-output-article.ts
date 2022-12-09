import {DtoOutputCategory} from "./dto-output-category";
import {DtoOutputBrand} from "./dto-output-brand";

export interface DtoOutputArticle {
  id: number
  nametag : string
  price : number
  pricingType : number
  category : DtoOutputCategory
  brand : DtoOutputBrand
}
