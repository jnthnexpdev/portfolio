import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CVService } from '../../shared/services/cv-service';

@Component({
  selector: 'app-footer',
  imports: [ TranslatePipe ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
    public email = 'jnthnexpdev@gmail.com';
    public phone = '735 223 63 51';
    public location = 'Morelos';
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