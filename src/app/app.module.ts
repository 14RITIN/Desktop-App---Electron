import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeTabComponent } from './components/employee-tab/employee-tab.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomeComponent,
    EmployeeTabComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
