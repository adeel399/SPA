import { Component } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { NavController,LoadingController,AlertController,ActionSheetController,ModalController} from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  subscriptionlist: any;
  pkgdetail: any;
  AlbumID: string;
  sharedusers: any;
  constructor(public http: HttpClient,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public alertController:AlertController,
    public modalController:ModalController,
    public router : Router,
    public activatedRoute : ActivatedRoute,
    private navCtrl:NavController) {
      this.userid = localStorage.getItem("userid");
      this.AlbumID=this.activatedRoute.snapshot.paramMap.get('modelName');
     }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }

  back(){
      this.navCtrl.navigateForward('/tabs/tab1'); 
  }


  async ionViewDidEnter() {
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.http.get(this.rootapi+'share?aid='+this.AlbumID,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
      this.sharedusers = data.Codes;
    
     
    });
    await loading.present();
    
  }

  async approved(albmid,usrid){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Approve this User?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
           let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.http.get(this.rootapi+'share?aid='+albmid+'&uid='+usrid,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
      this.sharedusers = data.Codes;
    
     
    });
    await loading.present();
          },
        },
      ],
    });

    await alert.present();
   
  }

  async delete(id,userid){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
           let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.http.delete(this.rootapi+'share?aid='+id+'&uid='+userid,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
      if(data.Text =="User Deleted Successfully"){
        let alert =   await this.alertController.create({
          header: 'Success',
          message: 'User Deleted Successfully',
          buttons: ['Dismiss']
        });
        await alert.present();
        let loading =  await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: 2000
        });
        this.http.get(this.rootapi+'share?aid='+this.AlbumID,this.httpOptions).subscribe(async (data:any) => {
          console.log(data);
          this.sharedusers = data.Codes;
        
         
        });
        await loading.present();
      }
     
    
     
    });
    await loading.present();
          },
        },
      ],
    });

    await alert.present();
   
  }
    
 
}
