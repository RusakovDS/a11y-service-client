import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../state/projects.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ID} from '@datorama/akita';

const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  loading = false;
  error = '';
  id: ID | undefined;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    dialogRef.disableClose = true;

    dialogRef.backdropClick().subscribe(
      () => {
        this.closeDialog();
      });

    this.id = this.data.id || undefined;
  }

  ngOnInit(): void {
    this.reactiveForm(this.data.newProject);
    if (this.data.newProject) {
      this.addNewUrl();
    } else {
      this.addEditUrls(this.data.url);
    }
  }

  reactiveForm(newProject: boolean = true): void {
    this.projectForm = this.fb.group({
      title: [newProject ? '' : this.data.title, Validators.required],
      description: [newProject ? '' : this.data.description],
      urls: this.fb.array([], Validators.required)
    });
  }

  get f() {
    return this.projectForm.controls;
  }

  get urlsList() {
    return this.f.urls as FormArray;
  }

  addNewUrl(): void {
    this.urlsList.push(this.fb.group({
      name: ['', [Validators.required, Validators.pattern(URL_REGEX)]]
    }));
  }

  addEditUrls(dataUrls): void {
    dataUrls.map(url => {
      this.urlsList.push(this.fb.group({
        name: [url.name, [Validators.required, Validators.pattern(URL_REGEX)]]
      }));
    });
  }

  OnDeleteUrl(index): void {
    if (this.urlsList.length === 1) {
      return;
    }
    this.urlsList.removeAt(index);
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }

    this.loading = true;
    const formValues = this.projectForm.value;
    const id = this.id;

    if (this.data.newProject) {
      return this.createProject(formValues);
    }

    return this.editProject(formValues, id);
  }

  createProject(formValues) {
    this.projectsService.create(formValues).subscribe(
      () => {
        this.snackBar.open('Project was created!', 'OK', {
          duration: 5000,
        });
        this.dialogRef.close();
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  editProject(formValues, id: ID) {
    this.projectsService.edit(formValues, id).subscribe(
      () => {
        this.snackBar.open('Project was updated!', 'OK', {
          duration: 5000,
        });
        this.dialogRef.close();
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  closeDialog(): void {
    const close = confirm('Do you wanna close add/edit of project');
    if (close) {
      this.dialogRef.close();
    }
  }

}
