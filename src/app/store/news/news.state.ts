import { Injectable } from '@angular/core';

//libs
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, concatMap, map, tap } from 'rxjs';

//app imports
import { ArticleService } from 'src/app/core/services/article.service';
import { Article, ArticleResponse } from './news.model';
import {
  GetArticleById,
  GetArticles,
  GetByTitleDescription,
  UpdateFilterString,
} from './news.action';
import { environment } from 'src/environments/environment';

interface StateModel {
  articles: Article[];
  articleCount: number;
  activeArticle: Article | null;
  prevPage: string | null;
  currentPage: string | null;
  nextPage: string | null;
  filter: string;
}

@State<StateModel>({
  name: 'articles',
  defaults: {
    articles: [],
    articleCount: 0,
    activeArticle: null,
    prevPage: '',
    currentPage: '',
    nextPage: '',
    filter: '',
  },
})
@Injectable()
export class ArticleState {
  @Selector()
  static getAllArticles(state: StateModel): Article[] {
    return state.articles;
  }

  @Selector()
  static getFilter(state: StateModel): string {
    return state.filter;
  }

  @Selector()
  static getArticleCount(state: StateModel): number {
    return state.articleCount;
  }

  @Selector()
  static getPrevPage(state: StateModel): string | null {
    return state.prevPage;
  }

  @Selector()
  static getCurrentPage(state: StateModel): string | null {
    return state.currentPage;
  }

  @Selector()
  static getNextPageUrl(state: StateModel): string | null {
    return state.nextPage;
  }

  @Selector()
  static getActiveArticle(state: StateModel): Article | null {
    return state.activeArticle;
  }

  @Selector()
  static getPagination(state: StateModel): number {
    const regex = /offset=(\d+)/;
    const match = state.currentPage?.match(regex);

    if (match) {
      const numberValue = parseInt(match[1], 10);
      return numberValue / 10;
    } else {
      return 0;
    }
  }

  constructor(private articleService: ArticleService) {}

  @Action(GetArticles)
  get_articles(
    { getState, setState }: StateContext<StateModel>,
    action: GetArticles
  ): Observable<Article[]> {
    const state = getState();
    let stream$: Observable<ArticleResponse>;

    stream$ = this.articleService.getAllArticles(action.payload);

    return stream$.pipe(
      tap(({ count, previous, next, results }) => {
        setState({
          ...state,
          articles: results,
          articleCount: count,
          prevPage: previous,
          currentPage: action.payload || environment.API_URL,
          nextPage: next,
        });
      }),
      tap(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })),
      map(({ results }) => results)
    );
  }

  @Action(GetArticleById)
  get_by_id(
    { getState, setState }: StateContext<StateModel>,
    action: GetArticleById
  ): Observable<Article> {
    const state = getState();
    return this.articleService
      .getArticleById(action.payload)
      .pipe(tap((res) => setState({ ...state, activeArticle: res })));
  }

  @Action(GetByTitleDescription)
  get_by_title_description(
    { getState, setState }: StateContext<StateModel>,
    action: GetByTitleDescription
  ): Observable<ArticleResponse> {
    const state = getState();

    return this.articleService.getByTitle(action.searchString).pipe(
      concatMap(() =>
        this.articleService.getByDescription(action.searchString)
      ),
      tap(({ count, previous, next, results }) =>
        setState({
          ...state,
          articleCount: count,
          prevPage: previous,
          currentPage: action.url || environment.API_URL,
          nextPage: next,
          articles: results,
        })
      ),
      tap(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))
    );
  }

  @Action(UpdateFilterString)
  update_filter(
    { getState, setState, dispatch }: StateContext<StateModel>,
    action: UpdateFilterString
  ) {
    const state = getState();
    setState({ ...state, filter: action.payload });
    return dispatch(new GetByTitleDescription(action.payload));
  }
}
