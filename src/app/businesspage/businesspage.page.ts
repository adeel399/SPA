import { Component,  } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import {NavController,AlertController,LoadingController,PopoverController,ActionSheetController,ModalController } from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-businesspage',
  templateUrl: './businesspage.page.html',
  styleUrls: ['./businesspage.page.scss'],
})
export class BusinesspagePage  {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  businesslist: any;
  search:any;
  favlist: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.5,
  };
  dataa: { ID: number; UserID: any; };
  
  constructor(private route: ActivatedRoute,
    public alertController:AlertController,
    private navCtrl:NavController,
    public router : Router,
    public modalController: ModalController,
    public http: HttpClient,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    public popoverController: PopoverController) {
      this.userid = localStorage.getItem("userid");
  
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
    })
  }
  async ionViewDidEnter(){
    
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  this.http.get(this.rootapi+'favourite?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
   this.favlist=data.Businesses;
   
  });
  await loading.present();
  }

  async searchbusiness(){
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  this.http.get(this.rootapi+'business?txt='+this.search,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
   this.businesslist=data.Businesses;
   
  });
  await loading.present();
}
  async fav(id){
    console.log(id);
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  this.dataa ={
    ID:id,
    UserID:this.userid
  }
  console.log(this.dataa);
  this.http.post(this.rootapi+'favourite',this.dataa,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
    this.http.get(this.rootapi+'favourite?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.favlist=data.Businesses;
     
    });
   
  });
  await loading.present();
}
  async trashfav(id){
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  this.http.delete(this.rootapi+'favourite?uid='+this.userid+'&bid='+id,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
    if(data.Text == "Favourite Deleted Successfully"){
      let alert =   await this.alertController.create({
        header: 'Success',
        message: 'Favourite Deleted Successfully',
        buttons: ['Dismiss']
      });
      await alert.present();
      this.http.get(this.rootapi+'favourite?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       this.favlist=data.Businesses;
       
      });
    }
    
   
  });
  await loading.present();
}

favalbum(id){
  this.router.navigate(['favbusiness', {modelName: id}]);
}

}
