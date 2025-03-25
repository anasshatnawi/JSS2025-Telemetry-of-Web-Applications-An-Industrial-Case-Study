import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Post } from "../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = 'http://localhost:5000/api/posts';
    postSubject = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts(): void {
        this.http.get<Post[]>(this.apiUrl).subscribe(posts => {
            this.postSubject.next(posts);
        });
    }

    addPost(postData: { title: string; content: string; authorId: string }): Observable<Post> {
        return this.http.post<Post>(this.apiUrl, postData);
    }

    deletePost(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    likePost(id: string): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/${id}/like`, {});
    }

    dislikePost(id: string): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/${id}/dislike`, {});
    }
}