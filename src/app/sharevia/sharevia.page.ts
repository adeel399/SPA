import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController,PopoverController,AlertController ,NavParams,LoadingController, ModalController} from '@ionic/angular';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { SharecodePage } from '../sharecode/sharecode.page';
@Component({
  selector: 'app-sharevia',
  templateUrl: './sharevia.page.html',
  styleUrls: ['./sharevia.page.scss'],
})
export class ShareviaPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  albumid: any;
  sharingMsg: any;
  AlbumID: any;
  userid: string;
  sharecodes: any;
  credit: any;
  sharemsg: any;
  expshare: any;
  generate: any;
  allowshare: any;
  allowupload: any;
  preapprove:any;
  showEye: boolean = true;
  showtable: boolean = false;
  currentDisplayIndex:number=-1;
  sharecodelength: any;
  buybutton: any;
  ownerID: any;
  shid: number;
  upid: number;
  shexpid: number;
  dataa: { UserID: string; AlbumID: any; };

  constructor(private socialSharing: SocialSharing,
    private navCtrl:NavController,
    public alertController: AlertController,
    public navParams : NavParams,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    public modalController:ModalController,
    private route: Router,
    public http: HttpClient,
    public popoverController: PopoverController) {
    this.userid = localStorage.getItem("userid");
    this.AlbumID=this.navParams.get('albumid');
    console.log(this.AlbumID);
   }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
    })
  }
  ngOnInit() {
  }

  async ionViewDidEnter(){
    
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.http.get(this.rootapi+'album?uid='+this.userid+'&aid='+this.AlbumID,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.credit=data.Credits;
     this.sharemsg=data.Message;
     this.ownerID=data.IsOwner;
     console.log(this.ownerID);
     this.sharecodes=data.ShareCodes;
     this.sharecodelength=data.ShareCodes.length;
     console.log(this.sharecodelength);

     this.expshare=data.AllowExpShare;
     if(this.expshare == 0){
       this.expshare=false;

     }else{
      this.expshare=true;
     }
     this.generate=data.AllowGenerate;
     this.buybutton=data.ShowBuyButton;
     this.allowshare=data.AllowShare;
     if(this.allowshare == 0){
      this.allowshare=false;

    }else{
     this.allowshare=true;
    }
     
     this.allowupload=data.AllowUpload;
     if(this.allowupload == 0){
      this.allowupload=false;

    }else{
     this.allowupload=true;
    }
    this.preapprove=data.AutoApproveUpload;
    if(this.preapprove == 0){
      this.preapprove=false;
    }else{
      this.preapprove=true;
    }
     
    });
    await loading.present();
    }

   

toggleShowPassword(index) {
  this.showEye = !this.showEye;
  if(this.currentDisplayIndex==index)
  {
    console.log(index);
    this.currentDisplayIndex=-1; 
    return; 
  }else{
  this.currentDisplayIndex = index; 
     }
}
   async generatecode(){
     if(this.generate == 0 && this.buybutton == 1){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'You Dont have enough credit to generate code',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Buy Credit',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
     }else{
      let loading =  await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      this.dataa= {
        UserID:this.userid,
        AlbumID:this.albumid
      };
    
      
      this.http.post(this.rootapi+'share',this.dataa, this.httpOptions).subscribe( async (data:any) => {
       console.log(data);
       this.credit=data.Credits;
     this.sharemsg=data.Message;
     this.ownerID=data.IsOwner;
     this.sharecodes=data.ShareCodes;
     this.sharecodelength=data.ShareCodes.length;
     console.log(this.sharecodelength);

     this.expshare=data.AllowExpShare;
     if(this.expshare == 0){
       this.expshare=false;

     }else{
      this.expshare=true;
     }
     this.generate=data.AllowGenerate;
     this.buybutton=data.ShowBuyButton;
     this.allowshare=data.AllowShare;
     if(this.allowshare == 0){
      this.allowshare=false;

    }else{
     this.allowshare=true;
    }
     
     this.allowupload=data.AllowUpload;
     if(this.allowupload == 0){
      this.allowupload=false;

    }else{
     this.allowupload=true;
    }
    this.preapprove=data.AutoApproveUpload;
    if(this.preapprove == 0){
      this.preapprove=false;
    }else{
      this.preapprove=true;
    }
     
      });
      await loading.present();
     }

   }

   async Allowsharechange(event){
  console.log(event.detail.checked);
  let loading =  await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  if(event.detail.checked == true){
    this.shid=1;
  }else{
    this.shid=0;
  }
  if(this.expshare == false){
    this.expshare=0;

  }else{
   this.expshare=1;
  }
  if(this.allowupload == false){
    this.allowupload=0;

  }else{
   this.allowupload=1;
  }
  if(this.preapprove==false){
    this.preapprove=0;
  }else{
    this.preapprove=1;
  }
  console.log("albumid",this.AlbumID);
  console.log("shareID",this.shid);
  console.log("uploadid",this.allowupload);
  console.log("Expshare",this.expshare);
  this.http.get(this.rootapi+'share?aid='+this.AlbumID+'&shid='+this.shid+'&upid='+this.allowupload+'&shexid='+this.expshare+'&apid='+this.preapprove,this.httpOptions).subscribe(async (data:any) => {
    console.log(data);
   this.credit=data.Credits;
   this.sharemsg=data.Message;
   this.ownerID=data.IsOwner;
   this.sharecodes=data.ShareCodes;
   

   this.expshare=data.AllowExpShare;
   if(this.expshare == 0){
     this.expshare=false;

   }else{
    this.expshare=true;
   }
   this.generate=data.AllowGenerate;
   this.buybutton=data.ShowBuyButton;
   this.allowshare=data.AllowShare;
   if(this.allowshare == 0){
    this.allowshare=false;

  }else{
   this.allowshare=true;
  }
   
   this.allowupload=data.AllowUpload;
   if(this.allowupload == 0){
    this.allowupload=false;

  }else{
   this.allowupload=true;
  }
  this.preapprove=data.AutoApproveUpload;
    if(this.preapprove == 0){
      this.preapprove=false;
    }else{
      this.preapprove=true;
    }
   
  });
  await loading.present();
   }

   async Allowuploadchange(event){
    console.log(event.detail.checked);
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    if(event.detail.checked == true){
      this.upid=1;
      if(this.preapprove==false){
        this.preapprove=0;
      }else{
        this.preapprove=1;
      }
    }else{
      this.upid=0;
      this.preapprove=0;
    }
    if(this.expshare == false){
      this.expshare=0;
  
    }else{
     this.expshare=1;
    }
    if(this.allowshare == false){
      this.allowshare=0;

    }else{
     this.allowshare=1;
    }
   
    console.log("albumid",this.AlbumID);
    console.log("shareID",this.upid);
    console.log("uploadid",this.allowupload);
    console.log("Expshare",this.expshare);
    this.http.get(this.rootapi+'share?aid='+this.AlbumID+'&shid='+this.allowshare+'&upid='+this.upid+'&shexid='+this.expshare+'&apid='+this.preapprove,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.credit=data.Credits;
     this.sharemsg=data.Message;
     this.ownerID=data.IsOwner;
     this.sharecodes=data.ShareCodes;
     
  
     this.expshare=data.AllowExpShare;
     if(this.expshare == 0){
       this.expshare=false;
  
     }else{
      this.expshare=true;
     }
     this.generate=data.AllowGenerate;
     this.buybutton=data.ShowBuyButton;
     this.allowshare=data.AllowShare;
     if(this.allowshare == 0){
      this.allowshare=false;
  
    }else{
     this.allowshare=true;
    }
     
     this.allowupload=data.AllowUpload;
     if(this.allowupload == 0){
      this.allowupload=false;
  
    }else{
     this.allowupload=true;
    }
    this.preapprove=data.AutoApproveUpload;
    if(this.preapprove == 0){
      this.preapprove=false;
    }else{
      this.preapprove=true;
    }
    });
    await loading.present();
   }

   async Allowexpsharechange(event){
    console.log(event.detail.checked);
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    if(event.detail.checked == true){
      this.shexpid=1;
    }else{
      this.shexpid=0;
    }
    if(this.expshare == false){
      this.expshare=0;

    }else{
     this.expshare=1;
    }
    if(this.allowshare == false){
      this.allowshare=0;

    }else{
     this.allowshare=1;
    }
    if(this.allowupload == false){
      this.allowupload=0;
  
    }else{
     this.allowupload=1;
    }
    if(this.preapprove==false){
      this.preapprove=0;
    }else{
      this.preapprove=1;
    }
    
    this.http.get(this.rootapi+'share?aid='+this.AlbumID+'&shid='+this.allowshare+'&upid='+this.allowupload+'&shexid='+this.shexpid+'&apid='+this.preapprove,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.credit=data.Credits;
     this.sharemsg=data.Message;
     this.ownerID=data.IsOwner;
     this.sharecodes=data.ShareCodes;
     
  
     this.expshare=data.AllowExpShare;
     if(this.expshare == 0){
       this.expshare=false;
  
     }else{
      this.expshare=true;
     }
     this.generate=data.AllowGenerate;
     this.buybutton=data.ShowBuyButton;
     this.allowshare=data.AllowShare;
     if(this.allowshare == 0){
      this.allowshare=false;
  
    }else{
     this.allowshare=true;
    }
     
     this.allowupload=data.AllowUpload;
     if(this.allowupload == 0){
      this.allowupload=false;
  
    }else{
     this.allowupload=true;
    }
    this.preapprove=data.AutoApproveUpload;
    if(this.preapprove == 0){
      this.preapprove=false;
    }else{
      this.preapprove=true;
    }
     
    });
    await loading.present();
   }

   async AllowpreApprovechange(event){
    console.log(event.detail.checked);
    if(event.detail.checked == true){
      this.preapprove=1;
    }else{
      this.preapprove=0;
    }
    if(this.expshare == false){
      this.expshare=0;

    }else{
     this.expshare=1;
    }
    if(this.allowshare == false){
      this.allowshare=0;

    }else{
     this.allowshare=1;
    }
    if(this.allowupload == false){
      this.allowupload=0;
  
    }else{
     this.allowupload=1;
    }
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.http.get(this.rootapi+'share?aid='+this.AlbumID+'&shid='+this.allowshare+'&upid='+this.allowupload+'&shexid='+this.expshare+'&apid='+this.preapprove,this.httpOptions).subscribe(async (data:any) => {
      console.log(data);
     this.credit=data.Credits;
     this.sharemsg=data.Message;
     this.ownerID=data.IsOwner;
     this.sharecodes=data.ShareCodes;
     
  
     this.expshare=data.AllowExpShare;
     if(this.expshare == 0){
       this.expshare=false;
  
     }else{
      this.expshare=true;
     }
     this.generate=data.AllowGenerate;
     this.buybutton=data.ShowBuyButton;
     this.allowshare=data.AllowShare;
     if(this.allowshare == 0){
      this.allowshare=false;
  
    }else{
     this.allowshare=true;
    }
     
     this.allowupload=data.AllowUpload;
     if(this.allowupload == 0){
      this.allowupload=false;
  
    }else{
     this.allowupload=true;
    }
    this.preapprove=data.AutoApproveUpload;
    if(this.preapprove == 0){
      this.preapprove=false;
    }else{
      this.preapprove=true;
    }
     
    });
    await loading.present();
   }

   async delete(sharecode){
    
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
            this.http.delete(this.rootapi+'share?aid='+this.AlbumID+'&cid='+sharecode+'&uid='+this.userid,this.httpOptions).subscribe(async (data:any) => {
              console.log(data);
              this.credit=data.Credits;
     this.sharemsg=data.Message;
     this.ownerID=data.IsOwner;
     this.sharecodes=data.ShareCodes;
     this.sharecodelength=data.ShareCodes.length;
     console.log(this.sharecodelength);

     this.expshare=data.AllowExpShare;
     if(this.expshare == 0){
       this.expshare=false;

     }else{
      this.expshare=true;
     }
     this.generate=data.AllowGenerate;
     this.buybutton=data.ShowBuyButton;
     this.allowshare=data.AllowShare;
     if(this.allowshare == 0){
      this.allowshare=false;

    }else{
     this.allowshare=true;
    }
     
     this.allowupload=data.AllowUpload;
     if(this.allowupload == 0){
      this.allowupload=false;

    }else{
     this.allowupload=true;
    }
     
            });
              
            await loading.present();
          },
        },
      ],
    });

    await alert.present();
    
   }
   
   async share(sharetext){
    const alert = await this.alertController.create({
      cssClass: 'share-class',
      header: 'Invite',
      message: 'Select Platform to Share',
      buttons: [
        {
          text: 'Whatsapp',
          
          cssClass: 'btn1',
          handler: (blah) => {
            this.socialSharing.shareViaWhatsApp(sharetext, '', '');
          }
        }, {
          text: 'Email',
          cssClass: 'btn2',
          handler: () => {
            this.socialSharing.shareViaEmail(sharetext, '', ['']);
          }
        },
        {
          text: 'Message',
          cssClass: 'btn3',
          handler: () => {
            this.socialSharing.shareViaSMS(sharetext, '');
          }
        }
      ]
    });

    await alert.present();
    //  this.modalController.dismiss({
    //   'dismissed': true
    // });
    // setTimeout(async () => {
      
    //   this.sharecodemodel(sharetext);
    
    // }, 2000);
   }

  //  async sharecodemodel(sharetxt){
  //   console.log("ggg");
  //   const modal = await this.modalController.create({
  //     component: SharecodePage,
  //     componentProps:{
  //       sharemsg:sharetxt
  //      },
  //     cssClass: 'share-Code'
  //   });
    
  //  }

}
