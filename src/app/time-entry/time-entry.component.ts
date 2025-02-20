import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeEntryService } from './time-entry.service';
import { TimeEntry } from './time-entry.model';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss'],
  providers: [DialogService, MessageService]
})
export class TimeEntryComponent implements OnInit {
  userId = 1; // Simulando usuário logado
  timeEntries: TimeEntry[] = [];
  displayDialog = false;
  timeEntryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private timeEntryService: TimeEntryService,
    private messageService: MessageService
  ) {
    this.timeEntryForm = this.fb.group({
      taskId: [null, Validators.required],
      entryDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTimeEntries();
  }

  loadTimeEntries(): void {
    this.timeEntryService.getUserTimeEntries(this.userId).subscribe(entries => {
      this.timeEntries = entries;
    });
  }

  openDialog(): void {
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.timeEntryForm.reset();
  }

  saveTimeEntry(): void {
    if (this.timeEntryForm.valid) {
      const entry: TimeEntry = { ...this.timeEntryForm.value, userId: this.userId };
      this.timeEntryService.saveTimeEntry(entry).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Horas adicionadas!' });
        this.loadTimeEntries();
        this.closeDialog();
      });
    }
  }
}
