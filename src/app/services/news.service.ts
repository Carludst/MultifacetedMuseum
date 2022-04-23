import { Injectable } from '@angular/core';
import {News} from '../models/news.model';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newses$: Observable<News[]>;
  news$: Observable<News>;

  constructor(private afs: AngularFirestore) {
    this.newses$ = this.getAllNews().pipe(
      switchMap(news => {
        if (news){
          return this.afs.collection<News[]>('news').valueChanges();
        } else{
          return of(null);
        }
      })
    );
  }

  getAllNews(){
    return this.afs.collection('news').valueChanges() as Observable<News[]>;
  }

  getNews(newsId: string){
    return this.afs.collection('news', ref => ref.where('id', '==', newsId)).valueChanges();
  }

}
