import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient, } from '@angular/common/http';
import { NavController,LoadingController,AlertController,ActionSheetController,ModalController, ToastController} from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AddcardpopupPage } from '../addcardpopup/addcardpopup.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.5,
  };
  slideOpts2 = {
    initialSlide: 0,
    slidesPerView: 1.2,
  };
  userid: string;
  dp: any;
  name: any;
  email: any;
  pass: any;
  
  base64Image: any;
  obj: { ID: string; ProfilePicture64: any; };
  albumlist: any;
  cardlist: any;
  totalalbum: any;
  cardApi: { UserID: string; ID: any; Status: number; };
  cardlistlenght: number;
  sharealbumcount: any;
  constructor(public http: HttpClient,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    public alertController:AlertController,
    public modalController:ModalController,
    public camera: Camera,
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

  ngOnInit() {
  }
  async ionViewWillEnter(){
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.http.get(this.rootapi+'user?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
   console.log(data);
  this.dp=data.ProfilePictureURL;
  this.email=data.EmailAddress;
  this.name=data.Name;
  this.pass=data.Password;
  this.sharealbumcount=data.Credits;
    });

    this.http.get(this.rootapi+'album?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.albumlist=data.Albums;
     this.totalalbum=data.MyAlbumCount;
     
     
    });
    this.http.get(this.rootapi+'token?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.cardlist=data.Tokens;
     
    });
    await loading.present();
  }

  async updatepic(){
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
      quality: 100,
      sourceType: sourceType,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
    
     this.base64Image = imageData;
     this.obj={
      ID:this.userid,
      ProfilePicture64:this.base64Image
     }
     this.http.post(this.rootapi+'profilepicture',this.obj, this.httpOptions).subscribe( async (data:any) => {
      console.log(data.Text);
      
     });
  
    }, (err) => {
     console.log(err);
    });
  }

  albumview(id,ownerpic,ownername){
   
    this.router.navigate(['/tabs/tab1/Album', {modelName: id,modelName2:ownerpic,modelName3:ownername}]);
  }

  editbtn(){
    
    this.router.navigate(['/tabs/tab2/Edit-profile', {modelName1: this.email,modelName2: this.name,modelName3: this.pass,modelName4: this.dp}]);
  }


  subscribe(){
    this.router.navigate(['/tabs/tab2/subscription-packages', {
      modelName: this.sharealbumcount,
    }]);
      
  }
  async addcard(){
    const modal = await this.modalController.create({
      component: AddcardpopupPage,
      cssClass: 'booking-modal'
    });
    modal.onDidDismiss().then(async (dataReturned) => {
     
      console.log("here");
      this.http.get(this.rootapi+'token?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       this.cardlist=data.Tokens;
       
      });
    
    
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

  
  logout(){
    localStorage.removeItem("userid");
    localStorage.removeItem("playerid");
    this.navCtrl.navigateRoot("");
  }

}
