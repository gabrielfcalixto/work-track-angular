import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  project = { name: '', description: '', startDate: '', endDate: '' };

  constructor(
    private dialogRef: DynamicDialogRef,
    private projectService: ProjectService,
    private config: DynamicDialogConfig
  ) {}

  addProject() {
    this.projectService.addProject(this.project).subscribe(() => {
      this.dialogRef.close(true); // Close the dialog and return success
    });
  }

  close() {
    this.dialogRef.close(false); // Close without changes
  }
}
