import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {NavController, ToastController, ViewWillEnter} from '@ionic/angular';
import firebase from 'firebase/compat/app';
import AuthCredential = firebase.auth.AuthCredential;
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.page.html',
  styleUrls: ['./change-profile.page.scss'],
})
export class ChangeProfilePage implements OnInit{

  changeProfileForm: FormGroup;

  changeId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UsersService,
              private navController: NavController,
              private toaster: ToastController,
              private translateService: TranslateService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('changeId')){return;}
      this.changeId = paramMap.get('changeId');
      if (this.changeId === 'change_password'){
        this.changeProfileForm = this.fb.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          cpassword: ['', [Validators.required, Validators.minLength(6)]]
        });
      }
      if (this.changeId === 'change_username'){
        this.changeProfileForm = this.fb.group({
          name: ['', [Validators.required]],
          surname: ['', [Validators.required]]
        });
      }
      if (this.changeId === 'change_email'){
        this.changeProfileForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
        });
      }
      if (this.changeId === 'reauth'){
        this.changeProfileForm = this.fb.group({
          reemail: ['', [Validators.required, Validators.email]],
          repassword: ['', [Validators.required, Validators.minLength(6)]]
        });
      }
    });
  }

  goto(){
    this.navController.navigateRoot('/tabs/account');
  }


  changeProfile(){

    if (this.changeId === 'change_username'){
      return this.userService.changeProfile(
        this.changeProfileForm.get('name').value + ' ' + this.changeProfileForm.get('surname').value).then(() => {
        this.navController.navigateRoot('/tabs/account');
        this.toast(this.translateService.instant('CambioCredenziali.toastName'), '');
      });
    }
    if (this.changeId === 'change_email'){
      return this.userService.changeProfile(null, this.changeProfileForm.get('email').value, null).then(() => {
        this.navController.navigateRoot('/tabs/account');
        this.toast(this.translateService.instant('CambioCredenziali.toastEmail'), '');
      });
    }
    if (this.changeId === 'change_password' &&
      this.changeProfileForm.get('password').value === this.changeProfileForm.get('cpassword').value){
      return this.userService.changeProfile(null, null, this.changeProfileForm.get('password').value).then(() => {
        this.navController.navigateRoot('/tabs/account');
        this.toast(this.translateService.instant('CambioCredenziali.toastPassword'), '');
      });
    }
    if (this.changeId === 'reauth'){

      const user = firebase.auth().currentUser;

      const credential = firebase.auth.EmailAuthProvider.credential(
        this.changeProfileForm.get('reemail').value, this.changeProfileForm.get('repassword').value);

      return user.reauthenticateWithCredential(credential).then(() => {

        this.navController.navigateRoot('/change-profile/change_password');
      }).catch((error) => {
        this.toast(this.translateService.instant('CambioCredenziali.toastErrore'), 'danger');
      });
    }
  }

  async toast(message, status){
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'bottom',
      duration: 1500
    });

    toast.present();

  }
  get email(){
    return this.changeProfileForm.get('email');
  }

  get password(){
    return this.changeProfileForm.get('password');
  }

  get reemail(){
    return this.changeProfileForm.get('reemail');
  }

  get repassword(){
    return this.changeProfileForm.get('repassword');
  }
}
