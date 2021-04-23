import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import {NavController,AlertController,LoadingController,PopoverController,ActionSheetController,ModalController } from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { PopoverPage } from '../popover/popover.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AddAlbumPage } from '../add-album/add-album.page';
@Component({
  selector: 'app-favbusiness',
  templateUrl: './favbusiness.page.html',
  styleUrls: ['./favbusiness.page.scss'],
})
export class FavbusinessPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  albumlist: any;
  base64Image: any;
  currntID: any;
  obj: { ID: number; OwnerID: string; AlbumID: any; Image64: any; };
  profilepic: any;
  username: any;
  favalbum: any;

  
  constructor(private activatedRoute: ActivatedRoute,
    public alertController:AlertController,
    private navCtrl:NavController,
    public router : Router,
    public modalController: ModalController,
    public camera: Camera,
    public http: HttpClient,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    public popoverController: PopoverController) {
      this.userid=this.activatedRoute.snapshot.paramMap.get('modelName');
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
    })
  }
  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateForward('/tabs/tab3');
  }
  async ionViewDidEnter(){
    
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  this.http.get(this.rootapi+'album?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
   this.albumlist=data.Albums;
   
  });
  await loading.present();
  }

  async presentPopover(event: any,id) {
    console.log(id);
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      componentProps:{
       custom_id:id
      },
      event: event,
      translucent: true
    });
    popover.onDidDismiss().then(async (dataReturned) => {
     
      console.log("here");
      this.http.get(this.rootapi+'album?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       this.albumlist=data.Albums;
       
      });
    
    });
    await popover.present();

     
  }

  albumview(id,ownerpic,ownername){
   
    this.router.navigate(['/tabs/tab1/Album', {modelName: id,modelName2:ownerpic,modelName3:ownername}]);
  }
  businesssearch(){
    this.navCtrl.navigateForward('/tabs/tab1/Business-search');
  }

  async capture(id){
    this.currntID=id;
    console.log("album ID"+id);
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: async () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
     
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  pickImage(sourceType){
    console.log(sourceType);
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
    
     this.base64Image = imageData;
     this.obj={
      ID:0,
      OwnerID:this.userid,
      AlbumID:this.currntID,
      Image64:this.base64Image
     }
     this.http.post(this.rootapi+'image',this.obj, this.httpOptions).subscribe( async (data:any) => {
      console.log(data.Text);
      let alert =   await this.alertController.create({
        header: 'Success',
        message: 'Image Uploaded Successfully',
        buttons: ['Dismiss']
      });
      await alert.present();
      let loading =  await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      console.log("here");
      this.http.get(this.rootapi+'album?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       this.albumlist=data.Albums;
       
      });
    await loading.present();
      
     });
  
    }, (err) => {
     console.log(err);
    });
  }

  async fab(){
    console.log("ff");
    const modal = await this.modalController.create({
      component: AddAlbumPage,
      cssClass: 'add-album'
    });
    modal.onDidDismiss().then(async (dataReturned) => {
     
      console.log("here");
      this.http.get(this.rootapi+'album?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       this.albumlist=data.Albums;
       
      });
    
    });
    return await modal.present();
  }
}
