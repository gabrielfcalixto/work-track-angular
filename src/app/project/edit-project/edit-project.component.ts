import { Component, Inject } from '@angular/core';
import { ProjectsService } from '../project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent {
  project: any;

  constructor(
    private dialogRef: DynamicDialogRef,
    private projectService: ProjectService,
    @Inject(DynamicDialogConfig) private config: DynamicDialogConfig
  ) {
    this.loadProject();
  }

  loadProject() {
    this.projectService.getProject(this.config.data.projectId).subscribe(project => {
      this.project = project;
    });
  }

  editProject() {
    this.projectService.updateProject(this.project).subscribe(() => {
      this.dialogRef.close(true); // Close the dialog and return success
    });
  }

  close() {
    this.dialogRef.close(false); // Close without changes
  }
}
