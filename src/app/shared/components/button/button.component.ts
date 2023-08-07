import { Component, Input } from '@angular/core';

//app imports
import { ButtonColor, ButtonType } from 'src/app/core/enums';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: ButtonColor = ButtonColor.PRIMARY;
  @Input() type: ButtonType = ButtonType.BUTTON;
  @Input() text!: string;
}
