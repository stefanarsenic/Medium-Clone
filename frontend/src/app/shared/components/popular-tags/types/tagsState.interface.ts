import { TagsResponseInterface } from "./tagsResponse.interface";

export interface TagsStateInterface {
    isLoading: boolean,
    error: string | null,
    data: TagsResponseInterface | null
}