import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  constructor() { }
  reactiveForm: FormGroup = new FormGroup({
    checked: new FormControl(true),
    unchecked: new FormControl(false)
  });

  ngOnInit(): void {
  }

}
