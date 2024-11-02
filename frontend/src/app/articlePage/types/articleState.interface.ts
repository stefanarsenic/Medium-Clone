import { ArticleInterface } from "../../shared/types/article.interface";
import { ArticleResponseInterface } from "./ArticleResponse.interface";

export interface ArticleStateInterface {
    isLoading: boolean,
    error: string | null,
    data: ArticleInterface | null
}