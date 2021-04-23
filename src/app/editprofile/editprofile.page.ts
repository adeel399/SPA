import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { ModalController,AlertController ,NavController,ToastController,MenuController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  dataa:any;
  eaddres:any;
  pass:any;
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
  email: string;
  name: string;
  emaill: string;
  dp: string;

  constructor(public http: HttpClient,
    public modalController: ModalController,
    public alertController:AlertController,
    public toastController: ToastController,
    public menuController: MenuController,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl:NavController) {
      this.loginForm = this.formBuilder.group({
        email: ['' ,Validators.compose([Validators.email, Validators.required])],
        name: ['',Validators.required],
        password: ['',Validators.required],
        cpassword: ['',Validators.required],
      });

      this.eaddres= this.activatedRoute.snapshot.paramMap.get('modelName1');
      
      this.name= this.activatedRoute.snapshot.paramMap.get('modelName2');
      this.pass= this.activatedRoute.snapshot.paramMap.get('modelName3');
      this.dp= this.activatedRoute.snapshot.paramMap.get('modelName4');
      console.log(this.dp);
     }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }
  ngOnInit() {
  }

  back(){
    this.navCtrl.navigateForward('/tabs/tab2');
  }
  update(){
    this.dataa= {
      EmailAddress:this.eaddres,
      Name:this.name,
      Password:this.pass,
     
    };
  console.log(this.dataa);
    this.http.put(this.rootapi+'user',this.dataa, this.httpOptions).subscribe( async (data:any) => {
      console.log(data);
      if(data.Text == "Profile Updated Successfully"){
        let alert =   await this.alertController.create({
          header: 'Profile Update',
          message: 'Profile Updated Successfully',
          buttons: ['Dismiss']
        });
        this.navCtrl.navigateForward('/tabs/tab2');
        await alert.present();
       
      }
  });
  }

}
