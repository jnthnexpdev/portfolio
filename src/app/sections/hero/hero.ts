import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CVService } from '../../shared/services/cv-service';


@Component({
  selector: 'app-hero',
  imports: [ TranslatePipe ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
    public cvService = inject(CVService);

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
        }
    }

}