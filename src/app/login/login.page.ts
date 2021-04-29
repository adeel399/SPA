import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { ModalController,AlertController ,NavController,ToastController,MenuController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  dataa:any;
  eaddres:any;
  pass:any;
  remberme:any;
  loginForm: FormGroup;
  reactiveSubmitted: boolean = false;
  responseError: string = '';
  errorMessages = {
    email: {
      required: 'Email address required',
      email: 'Invalid email address'
    },
    password: {
      required: 'Password required'
    },
  };

  constructor(public http: HttpClient,
    public modalController: ModalController,
    public alertController:AlertController,
    public toastController: ToastController,
    public menuController: MenuController,
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl:NavController) {
      this.loginForm = this.formBuilder.group({
        email: ['' ,Validators.compose([Validators.email, Validators.required])],
        password: ['',Validators.required],
      });
     }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }

    ionViewWillEnter() {
      this.menuController.enable(false);
      if(localStorage.getItem("email") !== null && localStorage.getItem("password") !== null){
        this.eaddres = localStorage.getItem("email");
        this.pass = localStorage.getItem("password");
      }
    }  
  ngOnInit() {
    if(localStorage.getItem("userid") !== null){
       
      this.navCtrl.navigateForward('/tabs/tab1');
    }
    

  }

  register(){
    this.navCtrl.navigateForward('/register');
  }

  forget(){
    this.navCtrl.navigateForward('/forget');
  }
  
  home(){
    console.log("rememberMe: ",this.remberme);
    this.reactiveSubmitted = true;
    let form = this.loginForm;
  this.dataa= {
    EmailAddress:form.value.email,
    Password:form.value.password,
    PlayerID:''
  };

  // Set player ID Here
  // this.storage.get('playerid').then((val) => {
  //   this.dataa['PlayerID'] = val;
  // });
  
  this.http.post(this.rootapi+'login',this.dataa, this.httpOptions).subscribe( async (data:any) => {
   console.log(data);
   
  var mydata= data;
  if(mydata.ID > 0){
    localStorage.setItem("usertype",mydata.UserType);
    localStorage.setItem("userid",mydata.ID);
    if(this.remberme == true){
      localStorage.setItem("email",this.eaddres);
      localStorage.setItem("password",this.pass);
    }
    if(mydata.UserType == "2"){
      this.eaddres="";
      this.pass ="";
     
      this.navCtrl.navigateForward('/tabs/tab1');

    }
    else if(mydata.UserType == "1"){
      this.eaddres="";
      this.pass ="";
      this.navCtrl.navigateForward('/tabs/tab1');
    }
  }
  else if(data.Message =="Login Detail Not Found. Please Try Again Or Contact Support For Assistance."){
    let alert =   await this.alertController.create({
      header: 'Login',
      message: 'Login Detail Not Found. Please Try Again Or Contact Support For Assistance.',
      buttons: ['Dismiss']
    });
    await alert.present();
  } 
  });
}



}
