import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

//libs
import { Observable } from 'rxjs';

//app imports
import { environment } from 'src/environments/environment';
import { ArticleResponse, Article } from 'src/app/store/news/news.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAllArticles(url = this.BASE_URL): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(url);
  }

  getArticleById(id: string): Observable<Article> {
    const url = `${this.BASE_URL}${id}`;
    return this.http.get<Article>(url);
  }

  getByTitle(search: any): Observable<ArticleResponse> {
    const params = new HttpParams().set('title_contains_all', search);
    return this.http.get<ArticleResponse>(this.BASE_URL, { params });
  }

  getByDescription(search: any, url?: string): Observable<ArticleResponse> {
    const params = new HttpParams().set('summary_contains_all', search);
    return this.http.get<ArticleResponse>(this.BASE_URL, { params });
  }
}
