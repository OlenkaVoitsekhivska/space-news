import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

//libs
import { Observable } from 'rxjs';

//app imports
import { InputType } from 'src/app/core/enums';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterComponent),
      multi: true,
    },
  ],
})
export class FilterComponent {
  @Input() labelText!: string;
  @Input() placeholder!: string;
  @Input() type: InputType = InputType.TEXT;

  filterValue: string = '';

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: Observable<string>): void {
    value.subscribe((val) => (this.filterValue = val || ''));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Event handler for input changes
  onChangeFilter(value: string): void {
    this.filterValue = value;
    this.onChange(value); // Notify the parent form control of the new value
  }
}
