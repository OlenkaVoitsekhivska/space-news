import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//libs
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Observable, Subscription, debounceTime, switchMap } from 'rxjs';

//app imports
import { ArticleState } from 'src/app/store/news/news.state';
import {
  GetArticles,
  UpdateFilterString,
} from 'src/app/store/news/news.action';
import { Article } from 'src/app/store/news/news.model';

@Component({
  selector: 'app-news-gallery',
  templateUrl: './news-gallery.component.html',
  styleUrls: ['./news-gallery.component.scss'],
})
export class NewsGalleryComponent implements OnInit, OnDestroy {
  articles!: Observable<Article[]>;
  searchString!: string;

  //PAGINATOR
  pageSize = 10; // Number of items per page
  currentPage$!: Subscription;
  currentPage!: number;

  //SELECTORS
  articleCount!: Observable<number>;
  filter!: Observable<string>;
  prevPage!: Subscription;
  nextPage!: Subscription;
  page!: Subscription;

  prevPageUrl!: string | null;
  nextPageUrl!: string | null;
  pageUrl!: string | null;

  //FORM
  form!: FormGroup;

  //TEXT
  inputLabel = 'Filter by keywords';
  inputPlaceholder = 'Spaceship physics research';
  resultsText = 'Results:';
  noResultsText = 'No results for your query';

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeData();
    this.initializeForm();

    this.pageUrl
      ? this.store.dispatch(new GetArticles(this.pageUrl))
      : this.store.dispatch(new GetArticles());

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((val) => {
          this.searchString = this.trimUserInput(val['filter']);
          return this.store.dispatch(new UpdateFilterString(this.searchString));
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    [this.prevPage, this.nextPage, this.page, this.currentPage$].forEach(
      (sub) => sub.unsubscribe()
    );
  }

  // Event handler for page change
  public onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;

    if (this.currentPage < event.previousPageIndex!) {
      this.store.dispatch(new GetArticles(this.prevPageUrl!));
      return;
    } else if (this.currentPage > event.previousPageIndex!) {
      this.store.dispatch(new GetArticles(this.nextPageUrl!));
      return;
    } else {
      this.store.dispatch(new GetArticles());
    }
  }

  private trimUserInput(input: string): string {
    const trimmedInput = input
      .replace(/\s+/g, ' ') // Replace consecutive spaces with a single space
      .replace(/ (\s|$)/g, ',') // Replace single spaces with a comma
      .trim() // Trim leading and trailing spaces
      .replace(/\s+/g, ','); // Replace remaining spaces with commas

    return trimmedInput;
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      filter: [this.filter],
    });
  }

  private initializeData(): void {
    this.articles = this.store.select(ArticleState.getAllArticles);
    this.articleCount = this.store.select(ArticleState.getArticleCount);
    this.filter = this.store.select(ArticleState.getFilter);
    this.prevPage = this.store
      .select(ArticleState.getPrevPage)
      .subscribe((val) => (this.prevPageUrl = val));
    this.nextPage = this.store
      .select(ArticleState.getNextPageUrl)
      .subscribe((val) => (this.nextPageUrl = val));
    this.page = this.store
      .select(ArticleState.getCurrentPage)
      .subscribe((val) => (this.pageUrl = val));
    this.currentPage$ = this.store
      .select(ArticleState.getPagination)
      .subscribe((val) => (this.currentPage = val));
  }
}
