import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";
import { environment } from "../../../../../environments/environment.development";
import { ArticleResponseInterface } from "../../../../articlePage/types/ArticleResponse.interface";
import { ArticleInterface } from "../../../types/article.interface";

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    constructor(private http: HttpClient){}

    getFeed(url: string): Observable<GetFeedResponseInterface> {
        const fullUrl = environment.apiUrl + url;
        return this.http.get<GetFeedResponseInterface>(fullUrl);
    }

    addToFavorites(slug: string): Observable<ArticleInterface> {
        const fullUrl = `${environment.apiUrl}/articles/${slug}/favorite`
        return this.http.post<ArticleInterface>(fullUrl, null);
    }
}