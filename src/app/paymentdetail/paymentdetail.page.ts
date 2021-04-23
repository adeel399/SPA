import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient, } from '@angular/common/http';
import { NavController,LoadingController,AlertController,ActionSheetController,ModalController} from '@ionic/angular';
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
  constructor(public http: HttpClient,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public alertController:AlertController,
    public modalController:ModalController,
    public router : Router,
    public activatedRoute : ActivatedRoute,
    private navCtrl:NavController) {
      this.userid = localStorage.getItem("userid");
     }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }

  back(){
      this.navCtrl.navigateForward('/tabs/tab2/subscription-packages'); 
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
  
}
