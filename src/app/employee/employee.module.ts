import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [EmployeeListComponent],
  imports: [CommonModule, NgChartsModule],
  exports: [EmployeeListComponent],
})
export class EmployeeModule {}
