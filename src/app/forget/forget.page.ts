import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { ModalController,AlertController ,NavController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  // email: string;
  // password: string;
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  playerid: string = "one";
  dataa:any;
  forgetForm: FormGroup;
  reactiveSubmitted: boolean = false;
  responseError: string = '';
  errorMessages = {
    email: {
      required: 'Email address required',
      email: 'Invalid email address'
    },
   
     
  };
  constructor(public http: HttpClient,
    public modalController: ModalController,
    public alertController:AlertController,
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl:NavController) {
      this.forgetForm = this.formBuilder.group({
        email: ['' ,Validators.compose([Validators.email, Validators.required])],
       
      });
     }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }
  ngOnInit() {
  }
forget(){
  this.reactiveSubmitted = true;
  let form = this.forgetForm;
  this.dataa= {
    EmailAddress:form.value.email,
    Password:'',
    PlayerID:''
  };

  this.http.post(this.rootapi+'login',this.dataa, this.httpOptions).subscribe( async (data:any) => {
console.log(data);
if(data.Text == "Your Password Has Been Emailed To You."){
  let alert =   await this.alertController.create({
    header: 'Password Reset',
    message: 'Your Password Has Been Emailed To You.',
    buttons: ['Dismiss']
  });
  await alert.present();
  this.navCtrl.navigateForward('');
}else{
  let alert =   await this.alertController.create({
    header: 'Password Reset',
    message: 'Email Address Not Found. Please Try Again Or Contact Support For Assistance.',
    buttons: ['Dismiss']
  });
  await alert.present();
}
});
}
return(){
  this.navCtrl.navigateForward('');
}
}
