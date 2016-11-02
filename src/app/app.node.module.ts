// Fix Material Support
import { __platform_browser_private__ } from '@angular/platform-browser';
function universalMaterialSupports(eventName: string): boolean { return Boolean(this.isCustomEvent(eventName)); }
__platform_browser_private__.HammerGesturesPlugin.prototype.supports = universalMaterialSupports;
// End Fix Material Support


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CacheService } from './universal-cache';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    FormsModule,
    HomeModule,
    AboutModule,
    GridModule,
    AppRoutingModule,
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    CacheService
  ]
})
export class MainModule {
  constructor(public cache: CacheService) {

  }
  // we need to use the arrow function here to bind the context as this is a gotcha in Universal for now until it's fixed
  universalDoDehydrate = (universalCache) => {
    universalCache['Cache'] = JSON.stringify(this.cache.dehydrate());
  }
  universalAfterDehydrate = () => {
    this.cache.clear();
  }
}