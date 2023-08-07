import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//libs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

//app imports
import { ArticleState } from './news/news.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forFeature([ArticleState]),
  ],
  exports: [NgxsModule, NgxsReduxDevtoolsPluginModule],
})
export class StoreModule {}
