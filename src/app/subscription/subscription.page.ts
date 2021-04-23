import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient, } from '@angular/common/http';
import { NavController,LoadingController,AlertController,ActionSheetController,ModalController} from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.2,
    
  };
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  subscriptionlist: any;
  pkgdetail: any;
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
      this.navCtrl.navigateForward('/tabs/tab2'); 
  }
    
  ngOnInit() {
  }
  async ionViewWillEnter(){
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });

    this.http.get(this.rootapi+'subscription',this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.subscriptionlist=data.Levels;
     
     
    });
    await loading.present();
  }
  upgrade(){
    this.navCtrl.navigateForward('/tabs/tab2/Payment-cards');
  }

}
