import { Component } from '@angular/core';
import{AlertController} from '@ionic/angular';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage {
  result: string;
  paymentAmount : string = '12.00';
  currency : string = 'EUR';
  currencyIcon : string = '€';
  constructor(private alertController: AlertController) {
    const _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal'].Buttons({
        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount
              }
            }]
          });
        },

        // Finalize the transaction

        onApprove: (data, actions) => {
          actions.order.capture().then((details) => {
            // Show a success message to the buyer
            console.log(details);
            this.presentAlertConfirm();
          })

            .catch(err => {
              console.log(err);
            });

        }
      }).render('#paypal-button-container');
    }, 500);


  }

  generateCode() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ticket\'s code' ,
      message: 'Transazione completata ! \n'
        + 'Il tuo codice è: '+ this.generateCode(),
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
