import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helper/validate';
import { APP_CONSTANT } from 'src/app/helper/app.constant';

@Component({
  selector: 'app-business-contact',
  templateUrl: './business-contact.component.html',
  styleUrls: ['./business-contact.component.css']
})
export class BusinessContactComponent implements OnInit {
  businessContactModel: FormGroup;
  stateItems = APP_CONSTANT.STATES;
  @Input() parentModel: any;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.businessContactModel = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(32), Validators.pattern('[a-zA-Z- ]*')]],
      middleName: ['', Validators.maxLength(1)],
      lastName: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('[a-zA-Z- ]*')]],
      addressLine1: ['', Validators.maxLength(80)],
      addressLine2: ['', Validators.maxLength(50)],
      zipCode: [null, [ Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      city: [null, [Validators.maxLength(30), Validators.pattern('[A-Za-z]+[\\w\\s]+[A-Za-z]')]],
      state: [null],
      primaryContact: ['']

    }, {
     // validator: MustMatch('addressLine1', 'addressLine2')
  });
  }
  get form() { return this.businessContactModel.controls; }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log(form.value);
  }
  reset(){
    this.businessContactModel.reset();
  }
}
