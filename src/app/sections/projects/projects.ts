import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-projects',
    imports: [ NgClass, TranslatePipe],
    templateUrl: './projects.html',
    styleUrl: './projects.css',
})
export class Projects implements OnInit{
    public projects : any[] = [];
    public currentPage : number = 0;
    public pageSize : number = 3;
    public visibleProjects : any = [];
    public currentImageIndex : number [] = [];

    constructor(private translate : TranslateService){
    }

    ngOnInit(): void {
        //this.loadProjects();

        this.translate.onLangChange.subscribe(() => {
            this.loadProjects();
        });
    }

    public loadProjects() : void{
        this.translate.get('projects.projectList').subscribe((data) => {
            this.projects = data;
            this.updateVisibleProjects();
        });
    }

    public updateVisibleProjects(){
        const start = this.currentPage * this.pageSize;
        this.visibleProjects = this.projects.slice(start, start + this.pageSize);
        this.currentImageIndex = this.visibleProjects.map(() => 0);
    }

    public nextPage() : void{
        if((this.currentPage + 1) * this.pageSize < this.projects.length){
            this.currentPage++;
            this.updateVisibleProjects();
        }
    }

    public prevPage() : void{
        if(this.currentPage > 0){
            this.currentPage--;
            this.updateVisibleProjects();
        }
    }

    public nextImage(index : number) : void{
        if((this.currentImageIndex[index] + 1) < this.visibleProjects[index].imgs.length){
            this.currentImageIndex[index]++;
        }
    }

    public prevImage(index : number) : void{
        if(this.currentImageIndex[index] > 0){
            this.currentImageIndex[index]--;
        }
    }

}