import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    StudentCardComponent,
    AddNewStudentComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
