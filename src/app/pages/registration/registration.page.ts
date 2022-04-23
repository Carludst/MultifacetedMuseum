import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {UsersService} from '../../services/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  credentialForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private usersService: UsersService,
              private toaster: ToastController,
              private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
    });
  }

  async signUp(){
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.credentialForm.get('password').value === this.credentialForm.get('cpassword').value) {
      this.usersService.signUp(this.credentialForm.value).then(user => {
        loading.dismiss();
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
      }, async err => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: this.translateService.instant('Registrati.RegistrazioneNonEffettuata'),
          message: err.message,
          buttons: ['OK']
        });

        await alert.present();
      });
    } else {
      loading.dismiss();
      this.toast(this.translateService.instant('Registrati.PasswordNonCombacianti'), 'danger');
      this.router.navigateByUrl('/registration', {replaceUrl: true});
    }
  }

  get email(){
    return this.credentialForm.get('email');
  }

  get password(){
    return this.credentialForm.get('password');
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
}
