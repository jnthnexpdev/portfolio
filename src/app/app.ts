import { Component, inject, OnInit, signal } from '@angular/core';

import {
    TranslateService,
} from "@ngx-translate/core";

import { I18nService } from './shared/services/i18n-service';

import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { Sidebar } from "./layout/sidebar/sidebar";
import { Hero } from "./sections/hero/hero";
import { Projects } from "./sections/projects/projects";
import { Skills } from "./sections/skills/skills";
import { AboutMe } from "./sections/about-me/about-me";
import { Contact } from "./sections/contact/contact";

@Component({
    selector: 'app-root',
    imports: [Header, Footer, Sidebar, Hero, Projects, Skills, AboutMe, Contact],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App implements OnInit{
    protected readonly title = signal('Jnthnexpdev');

    private translate = inject(TranslateService)
    private i18n = inject(I18nService);
    public isMenuOpen = signal(false);
    public currentLanguage : string = '';

    ngOnInit(): void {
        this.getLang();
    }

    ngAfterViewInit() {
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            }
        });
        },
        { threshold: 0.2 }
    );

    const sections = document.querySelectorAll(".reveal");
    sections.forEach((sec) => observer.observe(sec));
    }

    public getLang() : void{
        const Lang = this.i18n.getCurrentLanguage() as string;
        this.translate.use(Lang);
    }

    handleMenuToggle(state : boolean) : void{
        this.isMenuOpen.set(state);
    }
}