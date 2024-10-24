import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TagsResponseInterface } from "../types/tagsResponse.interface";
import { environment } from "../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
	constructor(private http: HttpClient) {}

	getTags(): Observable<TagsResponseInterface> {
		const apiUrl: string = environment.apiUrl;
		return this.http.get<TagsResponseInterface>(`${apiUrl}/tags`);
	}
}