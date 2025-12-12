import { inject, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CVService {

    public downloadCV() : void{
        const link = document.createElement('a');
        link.href = 'cv/CV_JonathanEspinosa_DesarrolladorWeb.pdf';
        link.download = 'CV_JonathanEspinosa_DesarrolladorWeb.pdf';
        link.click();
    }

}