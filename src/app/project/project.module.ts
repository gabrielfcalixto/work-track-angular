import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FilterProjectPipe } from './projects/filter-project.pipe';



@NgModule({
  declarations: [
    AddProjectComponent,
    EditProjectComponent,
    ProjectsComponent,
    FilterProjectPipe
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CardModule,
    InputTextModule,
    FormsModule

  ]
})
export class ProjectModule { }
