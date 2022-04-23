import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../../services/news.service';
import {News} from '../../../models/news.model';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  loadedNews: any;
  loadedNews$: News;

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService,
              private afs: AngularFirestore) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('newsId')){
        return;
      }
      const newsId = paramMap.get('newsId');
      this.newsService.getNews(newsId).pipe(
        switchMap( news => {
          if (news) {
            return this.afs.collection<News>('news', ref => ref.where('id','==',newsId)).valueChanges();
          } else {
            return of(null);
          }
        })
      ).subscribe(async news => {
        this.loadedNews = news;
        this.loadedNews$ = this.loadedNews[0];
      });
    });
  }
}
