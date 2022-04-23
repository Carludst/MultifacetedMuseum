import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';
import {StorageService} from './storage.service';

export const PREFERENCE_KEY = 'PREFERENCE_ITEM';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private storage: Storage, private storageService: StorageService) { //this.storage.create();
     }


  addToPreferences(show) {
    return this.getPreferencesItems().then(result => {
      if (result) {
        if (!this.containsObject(show, result)) {
          result.push(show);
          return this.storageService.setData(PREFERENCE_KEY, result);
        } else {
          this.removeFromPreferences(show);
        }
      } else {
        return this.storageService.setData(PREFERENCE_KEY, [show]);
      }
    });
  }

  removeFromPreferences(show){
    return this.getPreferencesItems().then(result => {
      if (result){
        var showIndex = this.returnIndexOf(result, show);
        result.splice(showIndex, 1);
        return this.storageService.setData(PREFERENCE_KEY, result);
      }
    });
  }

  removeAllPreferenceItems(){
    return this.storageService.removeData(PREFERENCE_KEY).then(res => {
      return res;
    });
  }

  containsObject(obj, list): boolean{
    if (!list.length || obj == null){
      return false;
    }

    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === obj.id){
        return true;
      }
    }
    return false;
  }

  getPreferencesItems(){
    //return this.storage.get(PREFERENCE_KEY);
    return this.storageService.getData(PREFERENCE_KEY);
  }

  returnIndexOf(array, item): number{
    var i;
    for (i = 0; i < array.length; i++){
      if (item.id === array[i].id){
        return i;
      }
    }
  }
}
