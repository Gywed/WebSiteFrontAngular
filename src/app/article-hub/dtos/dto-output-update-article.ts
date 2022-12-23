import {DtoInputCategory} from "../../dtos/dto-input-category";

export interface DtoOutputUpdateArticle {
  id: number,
  nametag : string,
  price : number,
  pricingType : number,
  stock : number,
  category : DtoInputCategory,
  brand : DtoInputCategory,
  imagePath : string,
  imageData : string
}
