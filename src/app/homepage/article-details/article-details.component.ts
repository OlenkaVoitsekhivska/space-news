import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//libs
import { Store } from '@ngxs/store';
import { Observable, Subscription, map, switchMap } from 'rxjs';

//app imports
import { ArticleState } from 'src/app/store/news/news.state';
import { GetArticleById } from 'src/app/store/news/news.action';
import { Article } from 'src/app/store/news/news.model';
import { ButtonColor, ButtonType } from 'src/app/core/enums';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  articleData!: Observable<Article | null>;

  //button inputs
  buttonColor: ButtonColor = ButtonColor.PRIMARY;
  buttonType: ButtonType = ButtonType.BUTTON;

  params$!: Subscription;

  //text
  buttonText: string = 'Return';

  //icons
  arrowLeftIcon = 'arrow_back';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.intializeActivatedParam();
    this.articleData = this.store.select(ArticleState.getActiveArticle);
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();
  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  intializeActivatedParam() {
    this.params$ = this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        switchMap((param) => this.store.dispatch(new GetArticleById(param)))
      )
      .subscribe();
  }
}
