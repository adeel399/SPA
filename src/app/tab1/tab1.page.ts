import { Component } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import {NavController,AlertController,LoadingController,PopoverController,ActionSheetController,ModalController } from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { PopoverPage } from '../popover/popover.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AddAlbumPage } from '../add-album/add-album.page';
import { CreatepopupPage } from '../createpopup/createpopup.page';
import { MultipleimgmodelPage } from '../multipleimgmodel/multipleimgmodel.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  albumlist: any;
  base64Image: any;
  currntID: any;
  obj: { ID: number; OwnerID: string; AlbumID: any; Image64: any; };
  profilepic: any;
  username: any;
  favalbum: any;
  multipleselect =[];
  chkboxID: any;
  multiarray_length: number;
  multiarray: number;
  tab: string;
  sharedalbumlist: any;
  myalbumlenght: number;
  sharealbumlenght: number;
  myalbumcount: any;
  mysharecount: any;
  dataa: { ID: number; IDs: any[]; };
  data1: { ID: any; Text: any; AuthorID: string; };
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
      this.tab = 'about';
      this.multiarray=Object.keys(this.multipleselect).length;
      this.userid = localStorage.getItem("userid");
      this.favalbum=this.activatedRoute.snapshot.paramMap.get('modelName');
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
    })
  }
  async ionViewDidEnter(){
    
  console.log(this.multiarray);
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  this.http.get(this.rootapi+'album?uid='+this.userid+'&oid='+1,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
   this.albumlist=data.Albums;
   this.myalbumcount=data.MyAlbumCount;
   this.mysharecount=data.SharedAlbumCount;
   this.myalbumlenght = Object.keys(this.albumlist).length;
   console.log(this.myalbumlenght);
   
  });
  this.http.get(this.rootapi+'album?uid='+-this.userid+'&oid='+0,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
   this.sharedalbumlist=data.Albums;
   this.sharealbumlenght = Object.keys(this.sharedalbumlist).length;
   console.log(this.sharealbumlenght);
  });
  await loading.present();
  }

  multipleimgview(){
    this.dataa= {
      ID:0,
      IDs:this.multipleselect
    };
  console.log(this.dataa);
    this.http.put(this.rootapi+'image',this.dataa, this.httpOptions).subscribe( async (data:any) => {
  console.log(data);
  let arrayphoto: any = [], id: number = 0;
  for (var i = 0; i < data.Images.length; i++) {
    
    arrayphoto.push({
      user:data.Images[i].OwnerName,
      userdp:data.Images[i].OwnerProfilePicture,
      upload:data.Images[i].Uploaded,
      imglink:data.Images[i].ImageURL
    });
  }

  const modal = await this.modalController.create({
    component: MultipleimgmodelPage,
    componentProps: {
      src: arrayphoto,
      id: id
    },
  });

  return await modal.present();
    });
  }

  checkboxchange(event,ID){
 console.log("Event",event.detail.checked);
  this.chkboxID=ID;
 if(event.detail.checked == true){
   this.multipleselect.push(this.chkboxID);
 }else{
  let index = this.multipleselect.indexOf(this.chkboxID);
  this.multipleselect.splice(index, 1);
 }
 console.log(this.multipleselect);
 console.log(Object.keys(this.multipleselect).length);

  }

  async presentPopover(event: any,id,owner,allowshare,allowupload,imgapproval,userapproval,Ownerpic,Ownername,allowexp) {
    console.log(id);
    console.log(allowexp);
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      componentProps:{
       custom_id:id,
       Owner:owner,
       Allowshare:allowshare,
       ALlowupload:allowupload,
       pendingimg:imgapproval,
       pendinguser:userapproval,
       ownername:Ownername,
       ownerdppic:Ownerpic,
       Allowexp:allowexp
      },
      event: event,
      translucent: true
    });
    popover.onDidDismiss().then(async (dataReturned) => {
     
      console.log("here");
      this.http.get(this.rootapi+'album?uid='+this.userid+'&oid='+1,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       this.albumlist=data.Albums;
       this.myalbumlenght = Object.keys(this.albumlist).length;
       console.log(this.myalbumlenght);
       
      });
      this.http.get(this.rootapi+'album?uid='+-this.userid+'&oid='+0,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       this.sharedalbumlist=data.Albums;
       this.sharealbumlenght = Object.keys(this.sharedalbumlist).length;
       console.log(this.sharealbumlenght);
      });
    
    });
    await popover.present();

     
  }

  albumview(id,OwnerIs,ownerpic,ownername,allowshare,allowupload,pendingimg,pendinguser,allowexp){
    this.multipleselect=[];
    console.log(allowexp);
    this.router.navigate(['/tabs/tab1/Album', {
      modelName: id,
      modelName4:OwnerIs,
      modelName2:ownerpic,
      modelName3:ownername,
      modelName5:allowshare,
      modelName6:allowupload,
      modelName7:pendingimg,
      modelName8:pendinguser,
      modelName9:allowexp,
    }]);
  }
  businesssearch(){
    this.multipleselect=[];
    this.navCtrl.navigateForward('/tabs/tab1/Business-search');
  }

  async capture(id){
    this.multipleselect=[];
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
      console.log(data);
      if(data.Text="Image Upload Success, Would You Like To Add A Description To This Image?"){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Confirm!',
          message: 'Image Upload Success, Would You Like To Add A Description To This Image?',
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
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Add A Description To This Image ',
          inputs: [
            {
              name: 'des',
              type: 'text',
              placeholder: 'Placeholder 1'
            },
           
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Submit',
              handler: async (alertData) => {
                console.log('Confirm Ok');
                if(alertData.des != null && alertData.des.length > 0){
                  let loading =  await this.loadingController.create({
                    cssClass: 'my-custom-class',
                    message: 'Please wait...',
                    duration: 2000
                  });
                  this.data1= {
                    ID:data.ID,
                    Text:alertData.des,
                    AuthorID:this.userid
                  };
                console.log(this.data1);
                  this.http.post(this.rootapi+'description',this.data1, this.httpOptions).subscribe( async (data:any) => {
                console.log(data);
                   
                this.http.get(this.rootapi+'album?uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
                      console.log(data);
                     this.albumlist=data.Albums;
                     
                    });
                  await alert.present();
                 
                });
                await loading.present();
                }else{
                  let alert =   await this.alertController.create({
                    header: 'Error',
                    message: 'Please Enter Description',
                    buttons: ['Dismiss']
                  });
                  await alert.present();
                  
                }

              }
            }
          ]
        });
    
        await alert.present();
    
        await loading.present();
              },
            },
          ],
        });
    
        await alert.present();
      }
  
      
     });
  
    }, (err) => {
     console.log(err);
    });
  }

  async fab(){
    this.multipleselect=[];
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Please Select An Action',
      buttons: [
         {
          text: 'Request Album Access',
          handler: async () => {
            const modal = await this.modalController.create({
              component: CreatepopupPage,
              cssClass: 'add-album'
            });
            
            modal.onDidDismiss().then(async (dataReturned) => {
             
              
              let loading =  await this.loadingController.create({
                cssClass: 'my-custom-class',
                message: 'Please wait...',
                duration: 2000
              });
              this.http.get(this.rootapi+'album?uid='+this.userid+'&oid='+1,this.httpOptions).subscribe(async (data:any) => {
                console.log(data);
               this.albumlist=data.Albums;
               this.myalbumcount=data.MyAlbumCount;
               this.mysharecount=data.SharedAlbumCount;
               this.myalbumlenght = Object.keys(this.albumlist).length;
               console.log(this.myalbumlenght);
               
              });
              this.http.get(this.rootapi+'album?uid='+-this.userid+'&oid='+0,this.httpOptions).subscribe(async (data:any) => {
                console.log(data);
               this.sharedalbumlist=data.Albums;
               this.sharealbumlenght = Object.keys(this.sharedalbumlist).length;
               console.log(this.sharealbumlenght);
              });
              await loading.present();
             });
            return await modal.present();
          }
        },{
          text: 'Create New Album',
          
          cssClass: 'secondary',
          handler: async (blah) => {
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
      ]
    });

    await alert.present();
  }

  pressed(){
 console.log("pressed");
  }
  active(){
    console.log("active");
  }
  released(){
    console.log("released");
  }
  
}
