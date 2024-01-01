import { Component } from '@angular/core';
import { common_home_page } from 'src/app/transalation/es/COMMON_MESSAGES_es';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  common_home_page = common_home_page
}
