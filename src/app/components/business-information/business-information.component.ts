import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MustMatch } from 'src/app/helper/validate';
import { APP_CONSTANT } from 'src/app/helper/app.constant';
@Component({
  selector: 'app-business-information',
  templateUrl: './business-information.component.html',
  styleUrls: ['./business-information.component.css']
})
export class BusinessInformationComponent implements OnInit {
  businessInformationModel: FormGroup;
  stateItems = APP_CONSTANT.STATES;
  user: any;
  token: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.businessInformationModel = this.fb.group({
      businessName: ['', [Validators.required, Validators.maxLength(72), Validators.pattern('[a-zA-Z- ]*')]],
      attentionName: ['', [Validators.pattern('[a-zA-Z- ]*')]],
      addressLine1: ['', [Validators.required, Validators.maxLength(80), this.addressValidator]],
      addressLine2: ['', Validators.maxLength(50)],
      zipCode: [null, [Validators.required, this.addressValidator, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      city: [null, [Validators.required, Validators.maxLength(30), this.addressValidator, Validators.pattern('[A-Za-z]+[\\w\\s]+[A-Za-z]')]],
      state: [null, [Validators.required, this.addressValidator]],
      offercode: ['', [Validators.maxLength(16), Validators.minLength(16)]],
      fein: ['', [Validators.required, Validators.minLength(9), Validators.pattern('[0-9]*')]],
      confirmfein: ['', [Validators.required, Validators.minLength(9), Validators.pattern('[0-9]*')]],
      phone1: ['', [Validators.required, Validators.minLength(12), Validators.pattern('^[0-9 \\-]+$')]],
      businessEmail: [null, [Validators.maxLength(60),
      // tslint:disable-next-line: max-line-length
      Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-\\_]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')]],
      employeecount: ['', [Validators.pattern('[0-9]*')]],
      requestedlines: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('[0-9]*')]],
      confirmPin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('[0-9]*')]]

    }, {
      validator: [MustMatch('fein', 'confirmfein'), MustMatch('pin', 'confirmPin')]
    });


    this.businessInformationModel.valueChanges.subscribe((data: any) => {
      console.log(data);

      if (this.form.fein.value && this.form.fein.valid && this.form.fein.value === data.confirmfein) {
        // this.form.confirmfein.setErrors({notvalid: true});
        console.log('matched');
      }
      if (this.form.pin.value && this.form.pin.valid && this.form.pin.value === data.confirmPin) {
        console.log('matched');
      }


      const { addressLine1, city, zipCode, state } = data;
      if (addressLine1 && city && zipCode && state && this.form.addressLine1.valid) {
        this.validateAddress(data);
      }
    });


    // this.getUser();
    // this.getToken();

  }
  addressValidator = () => {
    if (this.businessInformationModel) {
      const zipCodeControl = this.form.zipCode;
      const addressLine1Control = this.form.addressLine1;
      const cityControl = this.form.city;
      const stateControl = this.form.state;

      if (zipCodeControl.valid && addressLine1Control.valid && cityControl.valid && stateControl.valid) {
        console.log('true');
      }
    }
  }

  validateAddress(data) {

  }
  get form() { return this.businessInformationModel.controls; }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log(form.value);
  }
  reset() {
    this.businessInformationModel.reset();
  }
  // async getUser() {
  //   this.user = await this.oktaAuthentication.getUser();
  //   this.form.businessEmail.setValue(this.user.email);
  // }
  // async getToken() {
  //   this.token = await this.oktaAuthentication.getAccessToken();
  //   console.log(this.token);
  // }
  // logOut() {
  //   this.oktaAuthentication.logout();
  // }
}
