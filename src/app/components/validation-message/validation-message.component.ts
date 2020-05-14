import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {
  @Input() errorModel: any;
  @Input() requiredPlaceHolder: string;
  @Input() minLengthPlaceHolder: string;
  @Input() maxLengthPlaceHolder: string;
  @Input() patternPlaceHolder: string;
  @Input() updateToView: boolean;
  @Input() mustMatchPlaceHolder: string;

  constructor() { }

  ngOnInit(): void {
  }
}
