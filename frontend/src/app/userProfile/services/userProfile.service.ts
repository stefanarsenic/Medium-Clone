import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserProfileInterface } from "../types/userProfile.interface";
import { environment } from "../../../environments/environment.development";
import { GetUserProfileInterface } from "../types/getUserProfileResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    constructor(private http: HttpClient) {}

    getUserProfile(slug: string): Observable<UserProfileInterface> {
        const url = `${environment.apiUrl}/profiles/${slug}`;

        return this.http.get<GetUserProfileInterface>(url).pipe(map((response) => response.profile));
    }
}