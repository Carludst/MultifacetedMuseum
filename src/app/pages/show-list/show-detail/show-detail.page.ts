import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from 'src/app/models/show.model';
import {ShowListService} from 'src/app/services/show-list.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PreferencesService} from '../../../services/preferences.service';
import {NavController, ToastController} from '@ionic/angular';
import {ConnectivityService} from '../../../services/connectivity.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.page.html',
  styleUrls: ['./show-detail.page.scss'],
})
export class ShowDetailPage implements OnInit {
  loadedShow: any;
  loadedShow$: Show;

  constructor(private activetedRouter: ActivatedRoute,
              private showListServices: ShowListService,
              private afs: AngularFirestore,
              private preferenceService: PreferencesService,
              private toastController: ToastController,
              private navController: NavController,
              private connectivityService: ConnectivityService) { }

  ngOnInit() {
    this.activetedRouter.paramMap.subscribe(paramMap => {
      if(!paramMap.has('showId')){
        return;
      }
      const showId = paramMap.get('showId');
      this.showListServices.getShow(showId).pipe(
        switchMap( news => {
          if (news) {
            return this.afs.collection<Show>('show', ref => ref.where('id','==',showId)).valueChanges();
          } else {
            return of(null);
          }
        })
      ).subscribe(async show => {
        this.loadedShow = show;
        this.loadedShow$ = this.loadedShow[0];
      });
    });
  }


  addToPreferences(show){
    this.preferenceService.addToPreferences(show);
    this.navController.navigateRoot('preferences');
  }
}
