import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, Subject } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';
  userSubject = new Subject<User[]>();

  constructor(private http: HttpClient) { }

  getUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(users => {
      this.userSubject.next(users);
    });
  }

  addUser(userData: {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    birthday: Date;
    telephone: string;
    country: string;
    bio: string;
    favoriteNumber: string;
    favoriteColor: string;
    avatarImagePath: string;
    agreementLevel: string;
    getsNewsletter: boolean
  }): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  searchUsersByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?email=${email}`).pipe(
      catchError((error) => {
        console.error("Search error:", error);
        return of([]); // Return an empty array on error
      })
    );
  }
}