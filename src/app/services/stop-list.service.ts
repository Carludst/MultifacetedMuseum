import { Injectable } from '@angular/core';
import { Stop } from '../models/stop.model';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {switchMap} from 'rxjs/operators';
import {StorageService} from './storage.service';

export const STOP_LIST_KEY = 'STOP_LIST_KEY';

@Injectable({
  providedIn: 'root'
})
export class StopListService {

  stop$: Observable<Stop[]>;

  constructor(private afs: AngularFirestore, private storageService: StorageService) {
    this.stop$ = this.getAllStop().pipe(
      switchMap(stop => {
        if (stop){
          return this.afs.collection<Stop>('stop').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getAllStop(){
    return this.afs.collection('stop').valueChanges() as Observable<Stop[]>;
  }

  getStop(stopId: string){
    return this.afs.collection('stop', ref => ref.where('id','==', stopId)).valueChanges();
  }

  getStopFromStorage(){
    return this.storageService.getData(STOP_LIST_KEY);
  }

  getSingleStopFromStorage(stopId){
    return this.getStopFromStorage().then(stop => {
      for (let i of stop){
        if (i.id === stopId){
          return i;
        }
      }
    });
  }

  storeStopListData(stop){
    return this.storageService.setData(STOP_LIST_KEY, stop);
  }

  dataExist(){
    return this.storageService.dataExist(STOP_LIST_KEY);
  }

}
