import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CVService } from '../../shared/services/cv-service';
import { I18nService } from '../../shared/services/i18n-service';

type Lang = 'es' | 'en';
interface LangOption { code: Lang; label: string; flag: string; } 

@Component({
    selector: 'app-header',
    imports: [ TranslatePipe ],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header implements OnInit{
    public i18nService = inject(I18nService);
    public cvService = inject(CVService);
    public menuOpen = signal(false);
    public languages : LangOption[] = [
            { code : 'en', label : 'En', flag : 'flags/us.svg' },
            { code : 'es', label : 'Es', flag : 'flags/mx.svg' },
    ];
    public languageSelected = signal<LangOption>(this.languages[1]);
    public openLanguageSelect = signal(false);
    @Output() menuToggle = new EventEmitter<boolean>();

    ngOnInit(): void {
        const found = this.languages.find(l => l.code === this.i18nService.current());
        if(found){
            this.languageSelected.set(found);
        }
    }

    public openMenu() : void{
        this.menuOpen.set(true);
        this.menuToggle.emit(true);
    }

    public downloadCV() : void{
        this.cvService.downloadCV();
    }
    
    public selectLanguage(language : number) : void{
        const lang = this.languages[language];
        this.languageSelected.set(lang);
        this.i18nService.setLang(lang.code);
        this.toggleSelectLanguage();
    }

    public toggleSelectLanguage() : void{
        this.openLanguageSelect.set(!this.openLanguageSelect());
    }

    scrollTo(sectionId: string) {
        const yOffset = -80;
        const element = document.getElementById(sectionId);

        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
            top: y,
            behavior: 'smooth'
            });
        }
    }
    
}