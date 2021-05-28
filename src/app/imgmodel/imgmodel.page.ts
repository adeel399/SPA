import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,PopoverController,AlertController ,NavParams,LoadingController, ModalController,IonSlides } from '@ionic/angular';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imgmodel',
  templateUrl: './imgmodel.page.html',
  styleUrls: ['./imgmodel.page.scss'],
})
export class ImgmodelPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  rootapi = 'https://sharedphotoalbums.com/webapi/api/';
  imgs: any;
  id: any;
  User: any;
  slideOpts:any = {
    speed: 400
  };
  firstimg: any;
  userid: string;
  data1: { ID: any; Text: any; AuthorID: string; };
  constructor(private navCtrl:NavController,
    public alertController: AlertController,
    public navParams : NavParams,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    public modalController:ModalController,
    private route: Router,
    public http: HttpClient,
    public popoverController: PopoverController
  ) { 
    this.imgs = this.navParams.get('src');
    this.userid = localStorage.getItem('userid');
    this.id = this.navParams.get('id');
    this.slideOpts['initialSlide'] = this.id
    console.log(this.imgs);
   
  }

  ionViewWillEnter(){
    this.slides.update();
 }
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: '1eee32a8-aa03-47be-a902-9b0201cd1b23',
  }),
};
  ngOnInit() {
  
  }

  async deleteDes(id){
   
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure?',
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
          text: 'Yes delete',
          handler: async () => {
          let loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: 2000,
    });
    this.http
      .delete(this.rootapi + 'description?iid='+id, this.httpOptions).subscribe(async (data: any) => {
        console.log(data);
        if(data.Text == "Description Deleted Successfully"){
          let alert = await this.alertController.create({
            header: 'Success',
            message: 'Description Deleted Successfully',
            buttons: ['Dismiss'],
          });
          await alert.present();
          this.modalController.dismiss({
            'dismissed': true
          });
        }
        
      });
    await loading.present();
          },
        },
      ],
    });

    await alert.present();
    
  }
  async addDes(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Image Description',
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
              this.modalController.dismiss({
                'dismissed': true
              });
            }
           
             
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
 

  close(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
