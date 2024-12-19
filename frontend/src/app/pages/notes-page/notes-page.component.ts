import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotesApiService } from '../../services/api/notes-api.service';
import { IApiNotes } from '../../services/models/notes-api.interface';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, NgFor],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss',
})
export class NotesPageComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _notesApiService = inject(NotesApiService);

  // notes: IApiNotes[] = [];
  form = this._formBuilder.nonNullable.group({
    notes: this._formBuilder.array([]),
  });
  ngOnInit(): void {
    this._notesApiService.getNotes().subscribe({
      next: (data) => {
        console.log(data.notes);
        this.loadNotes(data.notes);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get notes(): FormArray {
    return this.form.controls.notes as FormArray;
  }

  loadNotes(notes: IApiNotes[]) {
    notes.forEach((note) => {
      this.notes.push(this._createFormGroup(note));
    });
  }

  _createFormGroup(note: IApiNotes): FormGroup {
    return this._formBuilder.group({
      title: [note.title],
      content: [note.content],
      createdAt: [note.created_at.split('T')[0]],
    });
  }

  clickInfo() {
    console.log(this.form.controls.notes.value);
  }
}
