import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectsComponent } from './projects/projects.component';



@NgModule({
  declarations: [
    AddProjectComponent,
    EditProjectComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProjectModule { }
