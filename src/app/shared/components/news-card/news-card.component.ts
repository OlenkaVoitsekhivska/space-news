import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//libs
import { Store } from '@ngxs/store';

//app imports
import { ArticleState } from 'src/app/store/news/news.state';
import { Article } from 'src/app/store/news/news.model';
import { ButtonColor, ButtonType } from 'src/app/core/enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit, OnDestroy {
  @Input() articleData!: Article;
  filter: string = '';
  filter$!: Subscription;

  //icons
  calendarIcon = 'calendar_today';
  arrowRightIcon = 'arrow_forward';

  //button inputs
  public readonly buttonColor: ButtonColor = ButtonColor.PRIMARY;
  public readonly buttonType: ButtonType = ButtonType.BUTTON;

  //text
  public readonly buttonText: string = 'Read more';

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.initializeFilter();
  }

  ngOnDestroy(): void {
    this.filter$.unsubscribe();
  }

  public navigateToDetailsPage() {
    this.router.navigate(['/home', this.articleData.id]);
  }

  initializeFilter() {
    this.filter$ = this.store
      .select(ArticleState.getFilter)
      .subscribe((val) => (this.filter = val));
  }
}
