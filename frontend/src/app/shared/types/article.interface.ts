import { ProfileInterface } from "./profile.interface"

export interface ArticleInterface {
    body: string,
    createdAt: string,
    description: string,
    favorited: string,
    favoritesCount: string,
    slug: string,
    tagList: string[],
    title: string,
    updatedAt: string  
    author: ProfileInterface 
}