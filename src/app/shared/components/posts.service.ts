import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { FbCreateResponse, Post } from '../../utils/interfaces/admin-panel.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse | any) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }))
  }
}
