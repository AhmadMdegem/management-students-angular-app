import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudent } from '../../interfaces/IStudent';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent {
  @Output() chooseSelectStudent = new EventEmitter<IStudent>();
  @Input() students: Array<IStudent> = [];
  selectStudent?: IStudent;

  onSelectStudent(student: IStudent) {
    this.selectStudent = student;
    this.chooseSelectStudent.emit(student);
  }
}
