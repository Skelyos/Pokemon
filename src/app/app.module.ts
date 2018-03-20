import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { PokemonService } from './pokemon.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
