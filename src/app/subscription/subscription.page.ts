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
  packslist: any;
  credithistorylist: any;
  selectedpack: any;
  sharealbumcount: string;
  constructor(public http: HttpClient,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public alertController:AlertController,
    public modalController:ModalController,
    public router : Router,
    public activatedRoute : ActivatedRoute,
    private navCtrl:NavController) {
      this.userid = localStorage.getItem("userid");
      this.sharealbumcount = this.activatedRoute.snapshot.paramMap.get('modelName');
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

    this.http.get(this.rootapi+'creditpacks',this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.packslist=data.Packs;
     
     
    });
    this.http.get(this.rootapi+'creditpacks?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.credithistorylist=data.Histories;
     
     
    });
    await loading.present();
  }
  active(data){

    console.log(data);
   this.selectedpack=data;
   
  }
  purchasenow(){
    this.router.navigate(['/tabs/tab2/Payment-cards', {modelName: this.selectedpack.ID,modelname2:this.sharealbumcount}]);
  
  }

  

}
