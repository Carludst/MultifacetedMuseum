import { Injectable } from '@angular/core';
import { Show } from '../models/show.model';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {switchMap} from 'rxjs/operators';
import {StorageService} from './storage.service';

const SHOW_LIST_KEY = 'SHOW_LIST_KEY';

@Injectable({
  providedIn: 'root'
})
export class ShowListService {

  shows$: Observable<Show[]>;

  constructor(private afs: AngularFirestore, private storageService: StorageService) {
    this.shows$ = this.getAllShow().pipe(
      switchMap(show => {
        if (show){
          return this.afs.collection<Show[]>('show').valueChanges();
        } else{
          return of(null);
        }
      })
    );
  }

  getAllShow(){
    return this.afs.collection('show').valueChanges() as Observable<Show[]>;
  }

  getShow(showId: string){
    return this.afs.collection('show', ref => ref.where('id', '==', showId)).valueChanges();
  }

  storeShowListData(show){
    return this.storageService.setData(SHOW_LIST_KEY, show);
  }

  removeAllData(){
    return this.storageService.removeData(SHOW_LIST_KEY);
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

  dataExist(){
    return this.storageService.dataExist(SHOW_LIST_KEY);
  }

  getShowDataFromStorage(){
    return this.storageService.getData(SHOW_LIST_KEY);
  }

  getSinglesShowFromStorage(showId){
    return this.getShowDataFromStorage().then(result => {
      for (let i of result){
        if (i.id === showId){
          return i;
        }
      }
    });
  }
}

