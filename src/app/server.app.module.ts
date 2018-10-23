import { NgModule } from '@angular/core';
import { BrowserAppModule } from './browser.app.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  imports: [
    BrowserAppModule,
    BrowserModule.withServerTransition({ appId: 'sketch-root' }),
    ServerModule
  ],
  bootstrap: [AppComponent],
})
export class ServerAppModule {}
