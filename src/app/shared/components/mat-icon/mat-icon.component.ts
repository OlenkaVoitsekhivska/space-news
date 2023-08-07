import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-icon',
  templateUrl: './mat-icon.component.html',
  styleUrls: ['./mat-icon.component.scss'],
})
export class MatIconComponent {
  @Input() icon!: string;
}
