import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appClipText]',
})
export class ClipTextDirective {
  @Input('appClipText') maxLength: number = 100;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxLength']) {
      this.clipText();
    }
  }

  private clipText(): void {
    const content = this.el.nativeElement.textContent;
    if (content.length > this.maxLength) {
      const clippedText = content.slice(0, this.maxLength) + '...';
      this.el.nativeElement.textContent = clippedText;
    }
  }
}
