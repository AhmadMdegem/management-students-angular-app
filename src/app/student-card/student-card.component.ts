import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudent } from '../../interfaces/IStudent';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css'],
})
export class StudentCardComponent {
  @Input() selectStudent?: IStudent;
  @Output() editDetails = new EventEmitter<boolean>();
  edit: boolean = false;
  changestudent() {
    this.edit = true;
    this.editDetails.emit(this.edit);
    this.edit = false;
  }
}
