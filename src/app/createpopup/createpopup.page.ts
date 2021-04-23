import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NavController,AlertController,LoadingController,PopoverController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-createpopup',
  templateUrl: './createpopup.page.html',
  styleUrls: ['./createpopup.page.scss'],
})
export class CreatepopupPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  loginForm: FormGroup;
  reactiveSubmitted: boolean = false;
  responseError: string = '';
  errorMessages = {
    email: {
      required: 'Email address required',
      email: 'Invalid email address'
    },
    name: {
      required: 'Your Name required'
    },
    cpassword:{
      required:'Confirm Password required'
    },
    password:{
      required:' Password required'
    }
  };
  obj: { Name: string; OwnerID: string; };
  album: string;
  constructor(
    public alertController:AlertController,
    private formBuilder: FormBuilder,
    private navCtrl:NavController,
    public modalController: ModalController,
    public http: HttpClient,
    public loadingController: LoadingController,
    public popoverController: PopoverController) { 
      this.loginForm = this.formBuilder.group({
        
        album: ['',Validators.required],
       
      });
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
 async addalbum(){
  // let loading =  await this.loadingController.create({
  //   cssClass: 'my-custom-class',
  //   message: 'Please wait...',
  //   duration: 2000
  // });
  // this.obj={
  //   Name:this.album,
  //   OwnerID:this.userid
  //  }
  //  this.http.post(this.rootapi+'album',this.obj, this.httpOptions).subscribe( async (data:any) => {
  //   console.log(data);
  //   if(data.Text == "Album Created Successfully"){
  //     let alert =   await this.alertController.create({
  //       header: 'Status',
  //       message: 'Album Created Successfully',
  //       buttons: ['Dismiss']
  //     });
  //     this.modalController.dismiss({
  //       'dismissed': true
  //     });
  //     await alert.present();
     
  //   }
    
  //  });
  //  await loading.present();
 }

}
