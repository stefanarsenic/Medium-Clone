import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { ArticleResponseInterface } from "../../articlePage/types/ArticleResponse.interface";
import { ArticleInterface } from "../../shared/types/article.interface";

@Injectable({
	providedIn: 'root'
})
export class CreateArticleService {
	constructor(private http: HttpClient){}

	createArticle(articleRequest: ArticleRequestInterface): Observable<ArticleInterface> {
		const fullUrl = environment.apiUrl + '/articles'

		return this.http.post<ArticleResponseInterface>(fullUrl, articleRequest)
			.pipe(map((response) => response.article))
	} 
}
