import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, EmployeeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
