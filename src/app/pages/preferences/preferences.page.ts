import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {PreferencesService} from '../../services/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

  preferenceItem: any[] = [];

  isPreferenceItemLoaded = false;

  isEmptyPreferences = true;

  constructor(private loadingController: LoadingController,
              private preferenceService: PreferencesService,
              private navController: NavController) { }

  ngOnInit() {
    this.loadPreferenceItem();
  }

  async loadPreferenceItem(){
    const loader = await this.loadingController.create();
    loader.present();

    this.preferenceService
      .getPreferencesItems()
      .then(val => {
        this.preferenceItem = val;
        this.isEmptyPreferences = false;
        this.isPreferenceItemLoaded = true;
        loader.dismiss();
      })
      .catch(err => {});
  }

  removeItem(item){
    this.preferenceService.getPreferencesItems().then(result => {
      console.log(result.getIndex(item));
    });
    this.preferenceService.removeFromPreferences(item).then(() => {
      this.loadPreferenceItem();
    });
  }

}
