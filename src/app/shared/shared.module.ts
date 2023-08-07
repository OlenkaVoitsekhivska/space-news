//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';

//components
import { NewsCardComponent } from './components/news-card/news-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { ButtonComponent } from './components/button/button.component';
import { MatIconComponent } from './components/mat-icon/mat-icon.component';

@NgModule({
  declarations: [
    NewsCardComponent,
    FilterComponent,
    ButtonComponent,
    MatIconComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CoreModule,
    MatIconModule,
    MatPaginatorModule,
    MatDividerModule,
  ],
  exports: [
    NewsCardComponent,
    FilterComponent,
    ButtonComponent,
    MatCardModule,
    MatIconComponent,
    MatPaginatorModule,
    MatDividerModule,
  ],
})
export class SharedModule {}
