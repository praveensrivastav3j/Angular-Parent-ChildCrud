import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  userForm: FormGroup;
  userData: any = [];



  constructor(private formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      fname: ['', []],
      lname: ['', []],
      email: ['', []],
      password: ['', []],
      address: ['', []],
      id: ['']
    });
  }

  ngOnInit() {
    if (localStorage.getItem(environment.localstorageKey)) {
      this.userData = JSON.parse(localStorage.getItem(environment.localstorageKey) || '');
    }
  }

  SubmitForm() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      if (this.userForm.value.id) {
        let index = this.userData.findIndex((x: any) => x.id == this.userForm.value.id);
        this.userData.splice(index, 1, this.userForm.value);
      } else {
        this.userForm.patchValue({
          id: new Date().getTime(),
        });
        this.userData.push(this.userForm.value);
      }
      localStorage.setItem(environment.localstorageKey, JSON.stringify(this.userData));
      this.userForm.reset();
      window.location.reload();                                                                                                 
    }
    console.log(this.userData);

  }                          

  updateData(event: any) {
    this.userData.forEach((element: any) => {
      if (element.id == event) {
        this.userForm.patchValue({
          fname: element.fname,
          lname: element.lname,
          email: element.email,
          password: element.password,
          address: element.address,
          id: element.id,
        })
      }
    });
  }
}