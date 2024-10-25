import { GetArticleResponseInterface } from "./getArticleResponse.interface";

export interface ArticleStateInterface {
    isLoading: boolean,
    error: string | null,
    data: GetArticleResponseInterface | null
}