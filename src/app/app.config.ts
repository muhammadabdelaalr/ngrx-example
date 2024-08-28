import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { appState } from './store/app.state';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';
import { CategoriesEffects } from './store/effects/categories.effects';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor, errorsInterceptor])),
    provideAnimations(),
    provideRouterStore(),
    provideStore(appState),
    provideEffects(ProductsEffects, CategoriesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration()
  ]
};
