import { Component } from '@angular/core';
import { common_register } from 'src/app/transalation/es/common/common_message_register_es';

@Component({
  selector: 'app-term-and-condition',
  templateUrl: './term-and-condition.component.html',
  styleUrls: ['./term-and-condition.component.scss']
})
export class TermsConditionComponent {
  common_register = common_register;

  cerrar(){
    window.self.close(); 
  }

}
