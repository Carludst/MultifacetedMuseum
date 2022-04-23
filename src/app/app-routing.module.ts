import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/login']);

const redirectLoggedInToHome = () =>
  redirectLoggedInTo(['/tabs']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'tabs/showList',
    children:[
      {
        path: '',
        loadChildren: () => import('./pages/show-list/show-list.module').then( m => m.ShowListPageModule)
      },
      {
        path: ':showId',
        loadChildren: () => import('./pages/show-list/show-detail/show-detail.module').then( m => m.ShowDetailPageModule)

      }
    ]
  },
  {
    path: 'tabs/home',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: ':newsId',
        loadChildren: () => import('src/app/pages/home/news/news.module').then(m => m.NewsPageModule)
      }
    ]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./pages/preferences/preferences.module').then( m => m.PreferencesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./pages/ticket/ticket.module').then( m => m.TicketsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'change-profile',
    children: [
      {
        path: ':changeId',
        loadChildren: () => import('./pages/change-profile/change-profile.module').then(m => m.ChangeProfilePageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      }
    ]
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
