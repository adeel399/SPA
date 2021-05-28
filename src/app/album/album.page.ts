import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import {
  NavController,
  AlertController,
  LoadingController,
  PopoverController,
  ModalController,
  ActionSheetController,
  Gesture,
  GestureController,
  IonCard,
} from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverPage } from '../popover/popover.page';
import { ImgmodelPage } from '../imgmodel/imgmodel.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  rootapi = 'https://sharedphotoalbums.com/webapi/api/';

  images: any = [];
  userid: string;
  AlbumID: any;
  gallerylist: any;
  ownername: string;
  ownerpic: string;
  base64Image: any;
  obj: { ID: number; OwnerID: string; AlbumID: any; Image64: any };
  img: string;
  element: any;
  longpressactive: boolean;
  multipleselect =[];
  chkboxID: any;
  multiarray_length: number;
  multiarray: number;
  ownerIS: string;
  dataa: { ID: number; IDs: any[]; };
  allowshare: string;
  allowupload: string;
  pendingimg: string;
  pendinguser: string;
  allowexp: string;
  data1: { ID: any; Text: any; AuthorID: string; };
  desobj: any;


  constructor(
    public modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private photoViewer: PhotoViewer,
    public alertController: AlertController,
    private navCtrl: NavController,
    private gestureCtrl: GestureController,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public http: HttpClient,
    public loadingController: LoadingController,
    public popoverController: PopoverController
  ) {
    this.multiarray=Object.keys(this.multipleselect).length;
    this.userid = localStorage.getItem('userid');
    console.log("userid",this.userid);
    
    this.AlbumID = this.activatedRoute.snapshot.paramMap.get('modelName');
    this.ownername = this.activatedRoute.snapshot.paramMap.get('modelName3');
    this.ownerpic = this.activatedRoute.snapshot.paramMap.get('modelName2')
    this.ownerIS = this.activatedRoute.snapshot.paramMap.get('modelName4');
    console.log("ownerid",this.ownerIS);
    this.allowshare = this.activatedRoute.snapshot.paramMap.get('modelName5');
    this.allowupload = this.activatedRoute.snapshot.paramMap.get('modelName6');
    this.pendingimg = this.activatedRoute.snapshot.paramMap.get('modelName7');
    this.pendinguser = this.activatedRoute.snapshot.paramMap.get('modelName8');
    this.allowexp = this.activatedRoute.snapshot.paramMap.get('modelName9');
    this.images = [
      'assets/imgs/a.jpg',
      'assets/imgs/1.jpg',
      'assets/imgs/2.jpg',
      'assets/imgs/3.jpg',
      'assets/imgs/g.jpg',
    ];
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: '1eee32a8-aa03-47be-a902-9b0201cd1b23',
    }),
  };
  back() {
    this.navCtrl.navigateForward('/tabs/tab1');
  }

  async ionViewDidEnter() {
    let loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    this.http
      .get(this.rootapi + 'image?aid=' + this.AlbumID+'&oid='+this.ownerIS, this.httpOptions)
      .subscribe(async (data: any) => {
        console.log(data);
        this.gallerylist = data.Images;
      });
    await loading.present();
  }

  async addDescription(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add A Description To This Image ',
      inputs: [
        {
          name: 'des',
          type: 'text',
          placeholder: 'Add Description..'
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
                ID:id,
                Text:alertData.des,
                AuthorID:this.userid
              };
            console.log(this.data1);
              this.http.post(this.rootapi+'description',this.data1, this.httpOptions).subscribe( async (data:any) => {
            console.log(data);
            if(data.Text =="Description Added Successfully"){
              let alert =   await this.alertController.create({
                header: 'Success',
                message: 'Description Added Successfully',
                buttons: ['Dismiss']
              });
              await alert.present();
            }
            this.http.get(this.rootapi + 'image?aid=' + this.AlbumID+'&oid='+this.ownerIS, this.httpOptions).subscribe(async (data: any) => {
            console.log(data);
            this.gallerylist = data.Images;
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

  }

  checkboxchange(event,ID,albmID){
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

     async multipleimgdelete(){
      this.dataa= {
        ID:this.AlbumID,
        IDs:this.multipleselect
      };
    console.log(this.dataa);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Delete Selected Images ?',
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
          text: 'Delete All',
          handler: async () => {
          let loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: 2000,
    });
    this.http.put(this.rootapi+'image',this.dataa, this.httpOptions).subscribe( async (data:any) => {
      console.log(data);
      this.gallerylist = data.Images;
        });
    await loading.present();
          },
        },
      ],
    });

    await alert.present();
     
     }

    async approveimg(imgid,albmid){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Approve this Image?',
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
            let loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000,
      });
      this.http.get(this.rootapi + 'image?aid=' +albmid+'&oid='+this.ownerIS+'&iid='+imgid, this.httpOptions)
        .subscribe(async (data: any) => {
          console.log(data);
          this.gallerylist = data.Images;
        });
      await loading.present();
            },
          },
        ],
      });
  
      await alert.present();
      
    }

  ngOnInit() {}
  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      componentProps: {
        custom_id: this.AlbumID,
        Owner:this.ownerIS,
        Allowshare:this.allowshare,
        ALlowupload:this.allowupload,
        pendingimg:this.pendingimg,
        pendinguser:this.pendinguser,
        ownername:this.ownername,
        ownerdppic:this.ownerpic,
        Allowexp:this.allowexp
      },
      event: event,
      translucent: true,
    });
    popover.onDidDismiss().then(async (dataReturned) => {
      console.log(dataReturned.data.data);
      if (dataReturned.data.data == 'userlist') {
        console.log('do nothing');
      } else {
        this.http
          .get(this.rootapi + 'image?aid=' + this.AlbumID, this.httpOptions)
          .subscribe(async (data: any) => {
            console.log(data);
            this.gallerylist = data.Images;
            this.navCtrl.navigateForward('/tabs/tab1');
          });
      }
    });
    await popover.present();
  }
  async openViewer(galleryobj) {
    // this.photoViewer.show(galleryobj.ImageURL);
    let arrayphoto: any = [], id: number = 0;
    for (var i = 0; i < this.gallerylist.length; i++) {
      this.desobj=this.gallerylist[i].Description;
      console.log(this.desobj);
      if(this.gallerylist[i]['ID'] == galleryobj.ID) id = i
      arrayphoto.push({
        url: this.gallerylist[i],
        type: 'string',
        user:this.gallerylist[i].OwnerName,
        userdp:this.gallerylist[i].OwnerProfilePicture,
        upload:this.gallerylist[i].Uploaded,
        Text:this.gallerylist[i].Text,
        authername:this.gallerylist[i].AuthorName,
        autherimg:this.gallerylist[i].AuthorProfilePicture
      });
    }

    const modal = await this.modalCtrl.create({
      component: ImgmodelPage,
      componentProps: {
        src: arrayphoto,
        id: id
      },
    });
    modal.onDidDismiss().then(async (dataReturned) => {
     
      console.log("here");
      this.http
      .get(this.rootapi + 'image?aid=' + this.AlbumID+'&oid='+this.ownerIS, this.httpOptions)
      .subscribe(async (data: any) => {
        console.log(data);
        this.gallerylist = data.Images;
      });
    
    });
    return await modal.present();
  }

  async capture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: async () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  pickImage(sourceType) {
    console.log(sourceType);
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      async (imageData) => {
        this.base64Image = imageData;
        this.obj = {
          ID: 0,
          OwnerID: this.userid,
          AlbumID: this.AlbumID,
          Image64: this.base64Image,
        };
        this.http
          .post(this.rootapi + 'image', this.obj, this.httpOptions)
          .subscribe(async (data: any) => {
            console.log(data.Text);
            let alert = await this.alertController.create({
              header: 'Success',
              message: 'Image Uploaded Successfully',
              buttons: ['Dismiss'],
            });
            await alert.present();
            let loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
              duration: 2000,
            });
            this.http
              .get(this.rootapi + 'image?aid=' + this.AlbumID, this.httpOptions)
              .subscribe(async (data: any) => {
                console.log(data);
                this.gallerylist = data.Images;
              });
            await loading.present();
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async delete(id, albumid) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are Your Sure?',
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
          text: 'Delete',
          handler: async () => {
            let loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
              duration: 2000,
            });
            this.http
              .delete(
                this.rootapi + 'image?aid=' + albumid + '&iid=' + id,
                this.httpOptions
              )
              .subscribe(async (data: any) => {
                console.log(data);
                let loading = await this.loadingController.create({
                  cssClass: 'my-custom-class',
                  message: 'Please wait...',
                  duration: 2000,
                });
                this.http.get(this.rootapi + 'image?aid=' + this.AlbumID+'&oid='+this.ownerIS,this.httpOptions).subscribe(async (data: any) => {
                 console.log(data);
                this.gallerylist = data.Images;
                }); 
                await loading.present();
              });
            await loading.present();
          },
        },
      ],
    });

    await alert.present();
  }

  //   onPress(cardarray) {
  //     for(let i= 0; i < cardarray.length; i++){
  //     const card=cardarray[i];
  //     console.log("card:",card);
  //     const gesture: Gesture = this.gestureCtrl.create({
  //       el: card.nativeElement,
  //       threshold: 15,
  //       gestureName: 'long-press',
  //       onStart: ev => {
  //         this.longpressactive=true;
  //       },
  //       onEnd: ev => {
  //         this.longpressactive=false;
  //       }
  //     });
  //     gesture.enable(true);
  //     }

  // }
}
