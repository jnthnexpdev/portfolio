import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-about-me',
    imports: [TranslatePipe],
    templateUrl: './about-me.html',
    styleUrl: './about-me.css',
})
export class AboutMe {
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