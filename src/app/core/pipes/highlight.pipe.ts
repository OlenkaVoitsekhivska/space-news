import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string, keywords: string): SafeHtml {
    if (!value || !keywords) {
      return value;
    }

    const keywordsArray = keywords.split(',').map((keyword) => keyword.trim());
    const regex = new RegExp(keywordsArray.join('|'), 'gi');

    const highlightedText = value.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
