import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { ModalController,AlertController ,NavController,MenuController,ToastController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  rootapi = "https://sharedphotoalbums.com/webapi/api/";
  dataa:any;
  eaddres:any;
  pass:any;
  loginForm: FormGroup;
  reactiveSubmitted: boolean = false;
  check:boolean = false;
  showEye: boolean = true;
  responseError: string = '';
  errorMessages = {
    email: {
      required: 'Email address required',
      email: 'Invalid email address'
    },
    password: {
      required: 'Password required'
    },
    confirmpassword: {
      required: 'Password required'
    },
    houseno:{
      required: 'Password required'
    },
    user:{
      required: 'Username required'
    },
    first:{
      required: 'First Name required'
    },
    title:{
      required: 'Title required'
    },
   
    postcode:{
      required: 'Password required'
    },
    check:{
      required: 'Password required'
    },
  };
  userype: number;

  constructor(public http: HttpClient,
    public modalController: ModalController,
    public alertController:AlertController,
    public toastController: ToastController,
    public menuController: MenuController,
    private changeRef: ChangeDetectorRef,
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl:NavController) {
      this.loginForm = this.formBuilder.group({
        email: ['' ,Validators.compose([Validators.email, Validators.required])],
        password: ['',Validators.required],
        confirmpassword: ['',Validators.required],
        user: ['',Validators.required],
        check: [false]
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
  }
  ngOnInit() {
 
  }
  login(){
    this.navCtrl.navigateForward('');
  }

  async register(){
    this.reactiveSubmitted = true;
    let form = this.loginForm;
    if(form.value.password == form.value.confirmpassword){
      if(form.value.check == true){
        this.userype=2;
      }else{
        this.userype=1;
      }
    this.dataa= {
      ID:0,
      Name:form.value.user,
      EmailAddress:form.value.email,
      UserType:this.userype,
      Password:form.value.password
    };
  console.log(this.dataa);
    this.http.post(this.rootapi+'user',this.dataa, this.httpOptions).subscribe( async (data:any) => {
  console.log(data);
    if(data.Text == "Registration Successful. You May Now Login."){
    let alert =   await this.alertController.create({
      header: 'Registeration',
      message: 'Registration Successful. You May Now Login.',
      buttons: ['Dismiss']
    });
    await alert.present();
    this.navCtrl.navigateForward('');
  }else{
    let alert =   await this.alertController.create({
      header: 'Registeration',
      message: 'Registration Failed. Please Try Again Or Contact Support For Assistance.',
      buttons: ['Dismiss']
    });
    await alert.present();
  }
  
  });
}else{
  let alert =   await this.alertController.create({
    header: 'Password Error',
    message: 'Password and confirm Password are not Same!',
    buttons: ['Dismiss']
  });
  await alert.present();
}
  }

  toggleShowPassword() {
    this.showEye = !this.showEye;
    this.changeRef.detectChanges();
  }

}
