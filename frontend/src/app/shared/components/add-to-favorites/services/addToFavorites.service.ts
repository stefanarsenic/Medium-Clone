import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ArticleInterface } from "../../../types/article.interface";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ArticleResponseInterface } from "../../../../articlePage/types/ArticleResponse.interface";

@Injectable({
	providedIn: 'root'
})
export class AddToFavoritesService {

	constructor(private http: HttpClient) {}

	addToFavorites(slug: string): Observable<ArticleInterface> {
		const url = this.getUrl(slug);
		return this.http
			.post<ArticleResponseInterface>(url, {})
			.pipe(map(this.getArticle));
	}

	removeFromFavorites(slug: string): Observable<ArticleInterface> {
		const url = this.getUrl(slug);
		return this.http
			.delete<ArticleResponseInterface>(url)
			.pipe(map(this.getArticle));
	}

	getArticle(response: ArticleResponseInterface): ArticleInterface {
		return response.article;
	}

	getUrl(slug: string): string {
		return `${environment.apiUrl}/articles/${slug}/favorite`
	}
} 