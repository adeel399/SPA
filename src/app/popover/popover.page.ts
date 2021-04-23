import { Component, OnInit } from '@angular/core';
import { NavController,PopoverController,AlertController ,NavParams,LoadingController, ModalController} from '@ionic/angular';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { ShareviaPage } from '../sharevia/sharevia.page';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  obj:any;
  albumid: any;
  albumlist: any;
  dataa: { AlbumID: any; };
  constructor(private navCtrl:NavController,
    public alertController: AlertController,
    public navParams : NavParams,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    public modalController:ModalController,
    private route: Router,
    public http: HttpClient,
    public popoverController: PopoverController,
    ) {
      this.userid = localStorage.getItem("userid");
      this.albumid=this.navParams.get('custom_id');
      
     }
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }
  ngOnInit() {
  }

  async userlist(){ 
    this.route.navigate(['/tabs/tab1/User-list', {modelName: this.albumid,}]);
    await this.popoverController.dismiss({ data:"userlist" });
  }

  async share(){
    this.popoverController.dismiss({
      'dismissed': true
    });
    this.dataa= {
      AlbumID:this.albumid,
    };
  console.log(this.dataa);
    this.http.post(this.rootapi+'share',this.dataa, this.httpOptions).subscribe( async (data:any) => {
      console.log(data);
      if(data.ID == 0){
        let alert =   await this.alertController.create({
          header: 'Error',
          message: 'Sharing Link Creation Failed',
          buttons: ['Dismiss']
        });
        
        await alert.present();
       
      }
      else if(data.ID == 1){
        const modal = await this.modalController.create({
          component: ShareviaPage,
          componentProps:{
            shareMsg:data.Text
           },
          cssClass: 'share-via'
        });
        modal.onDidDismiss().then(async (dataReturned) => {
         
          console.log("here");
         
        
        });
       
        
        return await modal.present();
      }
  });
   
    
  }

  async rename(){
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Rename Album',
      inputs: [
        {
          name: 'album',
          type: 'text',
          placeholder: 'Album Name'
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
          text: 'Rename',
          handler: async (alertData) => {
            let loading =  await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Please wait...',
              duration: 2000
            });
            this.obj= {
              ID:this.albumid,
              Name:alertData.album,
              OwnerID:this.userid,
             
            };
          console.log(this.obj);
            this.http.put(this.rootapi+'album',this.obj, this.httpOptions).subscribe( async (data:any) => {
              console.log(data);
              this.popoverController.dismiss({
                'dismissed': true
              });
             
            });
            await loading.present();
            
          }
        }
      ]
    });

    await alert.present();
  }
 async delete(){
  
   
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
        }
      }, {
        text: 'Delete',
        handler: async () => {
          let loading =  await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
          });
          this.http.delete(this.rootapi+'album?aid='+this.albumid, this.httpOptions).subscribe( async (data:any) => {
            console.log(data);
            this.popoverController.dismiss({
              'dismissed': true
            });
           
          });
          await loading.present();
        }
      }
    ]
  });

  await alert.present();
  
 }

}
