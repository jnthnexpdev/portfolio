import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { I18nService } from '../../services/i18n-service';
import { MatDialog } from '@angular/material/dialog';

type Lang = 'es' | 'en';
interface LangOption { code: Lang; label: string; flag: string; } 

@Component({
    selector: 'app-preferences',
    imports: [ NgClass],
    templateUrl: './preferences.html',
    styleUrl: './preferences.css',
})
export class Preferences implements OnInit{
    public languages : LangOption[] = [
        { code : 'en', label : 'Ingles', flag : 'flags/us.svg' },
        { code : 'es', label : 'Español', flag : 'flags/mx.svg' },
    ];
    public languageSelected = signal<LangOption>(this.languages[1]);
    public openLanguageSelect = signal(false);

    public themes = [
        { index : 0, value : 'light', label : 'claro' },
        { index : 1, value : 'dark', label : 'oscuro' }
    ];
    public themeSelected = this.themes[0];
    public openThemeSelect = signal(false);

    constructor(
        private i18nService : I18nService,
        private dialog : MatDialog
    ){}

    ngOnInit(): void {
        const found = this.languages.find(l => l.code === this.i18nService.current());
        if(found){
            this.languageSelected.set(found);
        }
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

    public selectTheme(index : number) : void{
        this.themeSelected = this.themes[index];
        this.openThemeSelect.set(false);
    }

    public toggleSelectTheme() : void{
        this.openThemeSelect.set(!this.openThemeSelect());
    }

    public closeDialog() : void{
        this.dialog.closeAll();
    }

}