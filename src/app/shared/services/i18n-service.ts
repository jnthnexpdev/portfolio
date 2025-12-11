import { inject, Injectable, signal } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

type Lang = 'es' | 'en';

@Injectable({
    providedIn: 'root',
})
export class I18nService {
    private t = inject(TranslateService);
    public current = signal<Lang>('es');

    constructor(){
        this.t.addLangs(['es', 'en']);
        
        const saved = (localStorage.getItem('lang') as Lang) || 'es';
        const langToUse = ['es', 'en'].includes(saved) ? saved : 'es';
        this.setLang(langToUse);
    }

    public setLang(lang : Lang) : void{
        this.current.set(lang);
        this.t.use(lang);
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
    }

    public getCurrentLanguage(){
        return localStorage.getItem('lang');
    }

    instant(key : string, params ?: any){
        return this.t.instant(key, params);
    }
}