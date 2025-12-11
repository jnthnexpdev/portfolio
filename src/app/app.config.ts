import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {provideTranslateService, provideTranslateLoader} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes,
            withInMemoryScrolling({
                anchorScrolling : 'enabled',
                scrollPositionRestoration : 'enabled'
            })
        ),
        provideHttpClient(),
        provideTranslateService({
            loader : provideTranslateHttpLoader({
                prefix : 'i18n/',
                suffix : '.json'
            }),
            
            fallbackLang : 'es',
        })
    ]
};
