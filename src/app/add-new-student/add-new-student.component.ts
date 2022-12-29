import { Courses } from '../enums/Courses';
import { IStudent } from '../../interfaces/IStudent';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.css'],
})
export class AddNewStudentComponent implements OnInit, OnChanges {
  @Output() addNewStudent = new EventEmitter<IStudent>();
  @Input() openToEdit: boolean = false;
  @Input() studentToEdit: IStudent;
  @Output() studentAfterEdit = new EventEmitter<IStudent>();
  studentForm: FormGroup;
  student: IStudent;
  mandatory: boolean = false;
  courses: Array<string> = Object.keys(Courses);

  createForm() {
    this.studentForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z]+$'),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z]+$'),
        ]),
        age: new FormControl(null, [Validators.required, this.legalAge]),
        averge: new FormControl(50, Validators.required),
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          this.legalGmail,
        ]),
        balance: new FormControl(null, Validators.required),
        course: new FormControl(null, Validators.required),
        imgUrl: new FormControl(''),
        progress: new FormControl(50, Validators.required),
      },
      {
        validators: this.legalFullName,
      }
    );
    if (this.openToEdit) {
      this.studentForm.setValue({ ...this.studentToEdit });
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['openToEdit']) this.createForm();
    this.openToEdit = false;
  }
  addStudent() {
    if (this.studentForm.valid) {
      this.addNewStudent.emit(this.studentForm.value);
      this.student = { ...this.studentForm.value };
      this.createForm();
      this.mandatory = false;
      this.studentAfterEdit.emit(this.student);
    } else {
      this.student = { ...this.studentForm.value };
      this.mandatory = true;
    }
  }
  getInfoToEdit() {
    this.studentForm.setValue({ ...this.studentToEdit });
  }
  legalFullName(control: AbstractControl) {
    const fName = control.get('firstName');
    const lName = control.get('lastName');

    if (String(fName.value).length + String(lName.value).length > 15) {
      return { legalName: true };
    }
    return null;
  }
  legalAge(age: FormControl) {
    if (age.value != null && (age.value < 18 || age.value > 120)) {
      return { legalAge: true };
    }
    return null;
  }
  legalGmail(email: FormControl) {
    if (!String(email.value).includes('@gmail.com')) {
      return { legalGmail: true };
    }
    return null;
  }
  get errorsAge() {
    if (this.getStudent.age.touched || this.mandatory) {
      if (this.getStudent.age.invalid) {
        if (this.getStudent.age.errors['required']) return 'Age is mandatory';
        if (this.getStudent.age.errors['legalAge'])
          return 'age must be between 18 - 120';
      }
    }
    return '';
  }
  get errorslastName() {
    if (this.getStudent.lastName.touched || this.mandatory) {
      if (this.getStudent.lastName.invalid) {
        if (this.getStudent.lastName.errors['required'])
          return 'lastName is mandatory';
        if (this.getStudent.lastName.errors['pattern'])
          return 'just letters in name';
      } else if (this.studentForm.errors) {
        return 'full name must be less than 15 letters';
      }
    }
    return '';
  }
  get errorsFirstName() {
    if (this.getStudent.firstName.touched || this.mandatory) {
      if (this.getStudent.firstName.invalid) {
        if (this.getStudent.firstName.errors['required'])
          return 'firstName is mandatory';
        if (this.getStudent.firstName.errors['pattern'])
          return 'just letters in name';
      } else if (this.studentForm.errors) {
        return 'full name must be less than 15 letters';
      }
    }
    return '';
  }
  get errorsEmail() {
    if (this.getStudent.email.touched || this.mandatory) {
      if (this.getStudent.email.invalid) {
        if (this.getStudent.email.errors['required'])
          return 'email is mandatory';
        if (this.getStudent.email.errors['legalGmail'])
          return 'only gmail account';
      }
    }
    return '';
  }
  get errorsCourse() {
    if (this.getStudent.course.touched || this.mandatory) {
      if (this.getStudent.course.invalid) {
        if (this.getStudent.course.errors['required'])
          return 'course is mandatory';
      }
    }
    return '';
  }
  get errorsBalance() {
    if (this.getStudent.balance.touched || this.mandatory) {
      if (this.getStudent.balance.invalid) {
        if (this.getStudent.balance.errors['required'])
          return 'balance is mandatory';
      }
    }
    return '';
  }
  get getStudent() {
    return {
      firstName: this.studentForm.get('firstName'),
      lastName: this.studentForm.get('lastName'),
      age: this.studentForm.get('age'),
      progress: this.studentForm.get('progress'),
      averge: this.studentForm.get('averge'),
      balance: this.studentForm.get('balance'),
      course: this.studentForm.get('course'),
      email: this.studentForm.get('email'),
    };
  }
}
