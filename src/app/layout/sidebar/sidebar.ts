import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Preferences } from '../../shared/components/preferences/preferences';
import { TranslatePipe } from '@ngx-translate/core';
import { I18nService } from '../../shared/services/i18n-service';
import { CVService } from '../../shared/services/cv-service';

type Lang = 'es' | 'en';
interface LangOption { code: Lang; label: string; flag: string; } 

@Component({
    selector: 'app-sidebar',
    imports: [TranslatePipe],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit{
    public dialog = inject(MatDialog);
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

    public closeMenu() : void{
        this.menuOpen.set(false);
        this.menuToggle.emit(false);
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

    public downloadCV() : void{
        this.cvService.downloadCV();
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

            this.closeMenu();
        }
    }
}