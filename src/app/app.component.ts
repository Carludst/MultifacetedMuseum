import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import {LanguageService} from 'src/app/services/language.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
              private languageService: LanguageService,
              public router: Router,) {
    this.initialiazeApp();
  }

  initialiazeApp() {
    this.platform.ready().then(() =>{
      this.languageService.setInitialAppLanguage();
    });
    this.router.navigateByUrl('/splash');
  }
}
