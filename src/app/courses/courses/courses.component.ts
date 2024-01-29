import { Component } from '@angular/core';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {

  courses: Observable<Course[]>;
  //courses: Course[] = [];
  displayedColumns = ['name', 'category'];

  //coursesService: CoursesService;

  constructor(private coursesService: CoursesService) {
    //this.courses = [];
    //this.coursesService = new CoursesService();
    //this.coursesService.list().subscribe(courses => this.courses = courses);
    this.courses = this.coursesService.list();
  }

}
