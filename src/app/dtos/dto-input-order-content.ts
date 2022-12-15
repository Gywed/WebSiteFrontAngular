import {DtoInputArticle} from "./dto-input-article";

export interface DtoInputOrderContent {
  article : DtoInputArticle,
  quantity : number,
  prepared : boolean
}
