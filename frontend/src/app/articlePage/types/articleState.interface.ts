import { ArticleInterface } from "./article.interface";
import { ArticleResponseInterface } from "./ArticleResponse.interface";

export interface ArticleStateInterface {
    isLoading: boolean,
    error: string | null,
    data: ArticleInterface | null
}