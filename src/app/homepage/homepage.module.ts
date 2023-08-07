//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

//components
import { NewsGalleryComponent } from './news-gallery/news-gallery.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';

@NgModule({
  declarations: [
    NewsGalleryComponent,
    HomepageComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', component: NewsGalleryComponent },
          {
            path: ':id',
            component: ArticleDetailsComponent,
          },
        ],
      },
    ]),

    SharedModule,
    CoreModule,
  ],
})
export class HomepageModule {}
