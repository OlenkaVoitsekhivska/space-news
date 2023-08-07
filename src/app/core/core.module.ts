import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightPipe } from './pipes/highlight.pipe';
import { ClipTextDirective } from './directives/clip-text.directive';

@NgModule({
  declarations: [HighlightPipe, ClipTextDirective],
  imports: [CommonModule],
  exports: [HighlightPipe, ClipTextDirective],
})
export class CoreModule {}
