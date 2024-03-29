import { Component, ViewEncapsulation } from '@angular/core';
import { SpinnerServiceGeneral } from 'src/app/shared/shared-components/spinner-world-loading/spinner.service';

@Component({
  selector: 'app-principal-chat',
  templateUrl: './principal-chat.component.html',
  styleUrls: ['./principal-chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PrincipalChatComponent {
  constructor(private sppiner: SpinnerServiceGeneral) {}
  ngOnInit() {
    this.sppiner.hideSpinner();
  }
}
