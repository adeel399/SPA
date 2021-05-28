import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient, } from '@angular/common/http';
import { NavController,LoadingController,AlertController,ActionSheetController,ModalController, ToastController} from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { AddcardpopupPage } from '../addcardpopup/addcardpopup.page';
@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.page.html',
  styleUrls: ['./paymentdetail.page.scss'],
})
export class PaymentdetailPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  cardlist: any;
  cardlistlenght: number;
  cardApi: { UserID: string; ID: any; Status: number; };
  creditpackid: string;
  public setBorderColor: boolean = false;
  selectedItem: any;
  paymentcard: { UserID: string; TokenID: any; CreditPackID: string; };
  sharealbumcount: string;
  constructor(public http: HttpClient,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public alertController:AlertController,
    public modalController:ModalController,
    public router : Router,
    public toastController: ToastController,
    public activatedRoute : ActivatedRoute,
    private navCtrl:NavController) {
      this.userid = localStorage.getItem("userid");
      this.creditpackid = this.activatedRoute.snapshot.paramMap.get('modelName');
      this.sharealbumcount = this.activatedRoute.snapshot.paramMap.get('modelname2');
     }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }

  back(){
    this.router.navigate(['/tabs/tab2/subscription-packages', {modelName:this.sharealbumcount}]);
  
     
  }
  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
}

  async checkout(){
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  this.paymentcard = {
    UserID:this.userid,
    TokenID:this.selectedItem.ID,
    CreditPackID:this.creditpackid
  }
  console.log(this.paymentcard);
  this.http.put(this.rootapi+'Token',this.paymentcard,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     
     if(data.Text = "Credits Purchased Successfully" ){
      const toast = await this.toastController.create({
        message: 'Credits Purchased Successfully',
        duration: 2000
      });
      toast.present();
    }
    this.navCtrl.navigateForward('/tabs/tab2');
    });

    await loading.present();
}
    
  ngOnInit() {
  }
  async ionViewWillEnter(){
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });

    this.http.get(this.rootapi+'token?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.cardlist=data.Tokens;
     this.cardlistlenght = Object.keys(this.cardlist).length;
    });
    await loading.present();
  }
  async addcard(){
    const modal = await this.modalController.create({
      component: AddcardpopupPage,
      cssClass: 'booking-modal'
    });
    return await modal.present();
  }
  
  async deletecard(cardID){
    const alert = await this.alertController.create({
      cssClass: 'Unordered Items In Your Basket',
      header: 'Delete Card',
      message: '<strong>Are Your Sure?"</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        }, {
          text: 'Yes Delete',
          handler: async () => {
            console.log('Delete');
           
            let loading =  await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
              duration: 2000
            });
            this.cardApi = {
              UserID:this.userid,
              ID:cardID,
              Status:-1
            }
            this.http.post(this.rootapi+'Token',this.cardApi,this.httpOptions).subscribe(async (data:any) => {
              console.log(data);
              await loading.present();
            const toast = await this.toastController.create({
            message: 'Card Removed Successfully',
            duration: 2000
            });
  
           toast.present();
           this.http.get(this.rootapi+'token?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
            console.log(data);
           this.cardlist=data.Tokens;
           this.cardlistlenght = Object.keys(this.cardlist).length;
          });
          });
         
        }
      }
    ]
  });
  await alert.present();
        
  }
  

}
