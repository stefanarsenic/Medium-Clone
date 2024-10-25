import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetArticleResponseInterface } from "../types/getArticleResponse.interface";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(private http: HttpClient) {}

	getArticle(slug: string): Observable<GetArticleResponseInterface> {
		const apiUrl = environment.apiUrl;
		return this.http.get<GetArticleResponseInterface>(`${apiUrl}/articles/${slug}`);
	}
}