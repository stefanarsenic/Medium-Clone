import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleResponseInterface } from "../types/ArticleResponse.interface";
import { environment } from "../../../environments/environment.development";
import { map, Observable } from "rxjs";
import { ArticleInterface } from "../types/article.interface";

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(private http: HttpClient) {}

	getArticle(slug: string): Observable<ArticleInterface> {
		const fullUrl = `${environment.apiUrl}/articles/${slug}`;
		return this.http.get<ArticleResponseInterface>(fullUrl)
		.pipe(map((response) => response.article));
	}
}