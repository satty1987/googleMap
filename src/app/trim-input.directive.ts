import { Directive, OnInit, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[trim-input]',
  host: {'(input)': 'onInputChange()'},
  providers: [{ provide: NG_VALIDATORS, useExisting: TrimInputDirective, multi: true }]
})

export class TrimInputDirective implements OnInit, Validator {
  private COMPONENT_NAME: string = 'TrimInputDirective';
  // need to fire this event to update the model
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(true);

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  getControlState: AbstractControl;

  public validate(control: AbstractControl): { [key: string]: any } {
    this.getControlState = control;
    return;
  }

  private initializeAmount() {
    this.el.value = "0.00";
    this.ngModelChange.emit(this.el.value);
  }

  @HostListener('focus', ['$event']) onfocus(event) {
    if (this.el.id === 'adjustPrice' && this.getControlState.pristine) {
      this.initializeAmount();
    }
    if (this.el.id === 'downPayment' && this.getControlState.pristine) {
      this.initializeAmount();
    }
    if (this.el.id === 'estMonthlyBill' && this.getControlState.pristine && this.getControlState.value == 0) {
      this.initializeAmount();
    }
    if (this.el.id === 'avgMonthlyBill' && (this.getControlState.pristine || (!this.getControlState.pristine && !this.getControlState.value))) {
      this.initializeAmount();
    }
  }

  @HostListener('keypress', ['$event']) onkeypress(event) {

    let e = <KeyboardEvent>event;

    if (this.el.id === 'adjustPrice' || this.el.id === 'avgMonthlyBill' || this.el.id === 'estMonthlyBill' || this.el.id === 'downPayment' ||
      this.el.id === 'ssn1' || this.el.id === 'ssn2' || this.el.id === 'confirmfullSsn' || this.el.id === 'confirmfullSsn2') {
      if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) || this.el.value.length > 6) {
        e.preventDefault();
      }
    }
    // Ensure that it is a number and stop the keypress
    if (this.el.className.indexOf('toCapitalize') === -1 && (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57))) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    const METHOD_NAME: string = 'ngOnInit()';
  }

  onInputChange() {
    console.log(this.el.className);
    const METHOD_NAME: string = 'onInputChange()';
    let val = this.el.value;
    if (val) { this.el.value = val.trim(); }
    if (this.el.id === 'ssn') {
      val = this.el.value.replace('-', '');
      val = val.replace(/\D/g, '');
      let newVal = '';
      if (val.length > 4) {
        this.el.value = val;
      }
      if ((val.length > 3) && (val.length < 6)) {
        newVal += val.substr(0, 3) + '-';
        val = val.substr(3);
      }
      if (val.length > 5) {
        newVal += val.substr(0, 3) + '-';
        newVal += val.substr(3, 2) + '-';
        val = val.substr(5);
      }
      newVal += val;
      this.el.value = newVal.substring(0, 11);
    } else if (this.el.id === 'phoneNumber' || this.el.id === 'nonTMOMobileNumber' || this.el.id === 'nonTMOMobileNumber1' || this.el.id === 'msisdnPhoneNumber') {
      val = this.el.value.replace('-', '');
      val = val.replace(/\D/g, '');
      let newVal = '';
      if ((val.length > 3) && (val.length <= 6)) {
        newVal += val.substr(0, 3) + '-';
        val = val.substr(3);
      }
      if (val.length > 6) {
        newVal += val.substr(0, 3) + '-';
        newVal += val.substr(3, 3) + '-';
        val = val.substr(6);
      }
      newVal += val;
      this.el.value = newVal.substring(0, 12);
    } else if (this.el.id === 'adjustPrice' || this.el.id === 'avgMonthlyBill' || this.el.id === 'estMonthlyBill' || this.el.id === 'downPayment') {
      if (val) {
        if (val.length === 1) {
          val = '0.0' + val;
        } else {
          val = this.changePosition(val);
        }
      }
      this.el.value = val;
      this.ngModelChange.emit(this.el.value);
    } else if (this.el.id === 'idExpiration1' || this.el.id === 'expiration') {
      val = this.el.value.replace('/', '');
      val = val.replace(/\D/g, '');
      if (val && val.length === 0) {
        return;
      } else if (val.length > 2 && val.length <= 7) {
        if (val.indexOf('/') === -1) {
          val = val.slice(0, 2) + '/' + val.slice(2, 6);
          // val= val.slice(0, 2) + '/' + val.slice(2,5);
        }
      }
      else if (val.length > 7) {
        if (val.indexOf('/') === -1) {
          val = val.slice(0, 2) + '/' + val.slice(2, 6);
          // val= val.slice(0, 2) + '/' + val.slice(2,5);
        }
      }
      this.el.value = val;
      this.ngModelChange.emit(this.el.value);

    }
    else if (this.el.id === 'dateOfBirth' || this.el.id === 'dateOfBirth1') {
      if (val) {

        val = this.el.value.replace('/', '');
        val = val.replace(/\D/g, '');
        let newVal = '';
        if ((val.length > 2) && (val.length <= 4)) {
          newVal += val.substr(0, 2) + '/';
          val = val.substr(2, 2);
        }
        if (val.length > 4) {
          newVal += val.substr(0, 2) + '/';
          newVal += val.substr(2, 2) + '/';
          val = val.substr(4);
        }
        newVal += val;
        this.el.value = newVal.substring(0, 10);
      }

    }
    else if (this.el.className.indexOf("toCapitalize") > -1) {
      if (val) {
        let wordsCollection = val.split(' ');
        let transformedValue = '';
        wordsCollection.forEach((word) => {
          if (word) {
            transformedValue += word[0].toUpperCase() + word.substring(1) + " ";
          }
        });
        this.el.value = wordsCollection[wordsCollection.length - 1] === "" ? transformedValue.trim() + " " : transformedValue.trim();
      }
    }
    // Credit card number should not accept characters while copy paste
    else if (this.el.id === "cardNumber") {
      this.el.value = val.replace(/\D/g, '');
    }
    // fire model change to update the value
    this.ngModelChange.emit(this.el.value);
  }

  private changePosition(val) {
    if (val.indexOf('.') > -1) {
      let beforeDec = val.split('.')[0];
      let afterDec = val.split('.')[1];
      if (afterDec.length === 3) {
        if (beforeDec === '0') {
          if (afterDec.indexOf('0') === 0) {
            return beforeDec + '.' + afterDec.substr(1);
          } else {
            return afterDec.charAt(0) + '.' + afterDec.substr(1);
          }
        } else {
          return beforeDec + afterDec.charAt(0) + '.' + afterDec.substr(1);
        }
      } else if (afterDec.length === 1) {
        if (val === '0.0' || val === '0.' || val === '0') {
          return val;
        } else {
          let i: string = '';
          if (beforeDec.length === 0 || beforeDec.length === 1) {
            i = '0';
          }
          return i + beforeDec.substr(0, beforeDec.length - 1) + '.' + beforeDec.substr(beforeDec.length - 1, beforeDec.length) + afterDec;
        }
      } else {
        return val;
      }
    } else {
      return val.substr(0, val.length - 1) + '.' + val.substr(val.length - 1, val.length) + '0';
    }
  }

  @HostListener('keyup', ['$event']) onKeyDown(e: any) {
    if ((this.el.id === 'ssn1' || this.el.id === 'ssn2' || this.el.id === 'confirmfullSsn' || this.el.id === 'confirmfullSsn2')
      && (e.srcElement.maxLength === e.srcElement.value.length)) {
      // e.preventDefault();
      let nextfocus: any = e.srcElement.nextSibling;
      console.log('nextfocus' + nextfocus);
      // Searching for next similar control to set it focus
      while (true) {
        if (nextfocus) {
          // if (nextfocus.type == e.srcElement.type) {
          nextfocus.focus();
          return;
          // } else {
          //     nextfocus = nextfocus.nextSibling;
          // }
        } else {
          return;
        }
      }
    }
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    this.el.id === 'pin' || this.el.id === 'confirmPin' ? e.preventDefault() : '';
  }
  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    this.el.id === 'pin' || this.el.id === 'confirmPin' ? e.preventDefault() : '';
  }
  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    this.el.id === 'pin' || this.el.id === 'confirmPin' ? e.preventDefault() : '';
  }
}
