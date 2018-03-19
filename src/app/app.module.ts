import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdjectiveService } from '../service/adjective.service';
import { TestComponent } from './test/test.component';

const appRoutes: Routes = [
  { path: '', component: TestComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [AdjectiveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
