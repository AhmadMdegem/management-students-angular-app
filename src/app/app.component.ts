import { students } from './data/students';
import { Component, Input, Output } from '@angular/core';
import { IStudent } from 'src/interfaces/IStudent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  students: Array<IStudent> = students;
  selectStudent?: IStudent;
  openToEdit: boolean = false;

  //student-card-component
  onEditDetails(openToEdit: boolean) {
    this.openToEdit = openToEdit;
  }
  //add-new-student-component
  addNewStudent(student: IStudent) {
    if (!this.openToEdit) this.students.unshift(student);
  }
  OnSaveChanges(student: IStudent) {
    let indexOfObject: number = this.students.findIndex((student) => {
      return this.selectStudent === student;
    });
    this.students[indexOfObject].age = student.age;
    this.students[indexOfObject].firstName = student.firstName;
    this.students[indexOfObject].lastName = student.lastName;
    this.students[indexOfObject].averge = student.averge;
    this.students[indexOfObject].progress = student.progress;
    this.students[indexOfObject].imgUrl = student.imgUrl;
    this.students[indexOfObject].balance = student.balance;
    this.students[indexOfObject].email = student.email;
    this.students[indexOfObject].course = student.course;

    this.openToEdit = false;
  }
  //list-student-component
  chooseSelectStudent(student: IStudent) {
    this.selectStudent = student;
    this.openToEdit = false;
  }
}
