import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, CategoryPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar os cursos!');
        return of([])
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
