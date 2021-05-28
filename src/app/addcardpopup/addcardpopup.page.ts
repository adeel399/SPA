import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { ModalController,AlertController ,NavController,ToastController,LoadingController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-addcardpopup',
  templateUrl: './addcardpopup.page.html',
  styleUrls: ['./addcardpopup.page.scss'],
})
export class AddcardpopupPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  cardnum: any;
  month: any;
  year: any;
  key: any;
  cardForm: FormGroup;
  card:any;
  userID:any;
  cardApi:any;
  reactiveSubmitted: boolean = false;
  responseError: string = '';
  errorMessages = {
    cardnum: {
      required: 'Card Number required',
      maxLength: 'Card Number must be at most 16 characters long'
     
    },
    month: {
      required: 'Month required',
      maxLength: 'Month field must be at most 2 characters long'
    },
    year: {
      required: 'Year required',
      maxLength: 'Year field must be at most 4 characters long'
    },
    key: {
      required: 'CVC required',
      maxLength: 'CVC field must be at most 3 characters long'
    },
     
  };
  userid: string;
  constructor(private stripe: Stripe,
    public http: HttpClient,
    public modalController: ModalController,
    public alertController:AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl:NavController) { 
      this.userid = localStorage.getItem("userid");
      this.cardForm = this.formBuilder.group({
        cardnum: ['',Validators.compose([Validators.required,Validators.maxLength(16)])],
        month: ['',Validators.compose([Validators.required,Validators.maxLength(2)])],
        year: ['',Validators.compose([Validators.required,Validators.maxLength(4)])],
        key: ['',Validators.compose([Validators.required,Validators.maxLength(3)])],
       
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

  async addcard(){
    let loading =  await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
  this.stripe.setPublishableKey('pk_test_51IpuA7E6Z22c21XOa3oXTczz5aU0R835ew8KOkOfxXVhATGBoj4UoveACJHQDPDq8Y6aZlfmAKq8rAc0qHPetBtd00j97xcCfn');

let card = {
 number: this.cardnum,
 expMonth: this.month,
 expYear: this.year,
 cvc: this.key
}
console.log(card);
this.stripe.createCardToken(card)
   .then(token => {
    
    this.cardApi = {
      UserID:this.userid,
      ID:token.id,
      Status:1
    }
    console.log(this.cardApi);
    this.http.post(this.rootapi+'Token',this.cardApi,this.httpOptions).subscribe(async (data:any) => {
        console.log(data);
       
       if(data.Text = "Card Added Successfully" ){
        const toast = await this.toastController.create({
          message: 'Card Added Successfully',
          duration: 2000
        });
        toast.present();
        this.modalController.dismiss({
          'dismissed': true
        });
       }
  
      })
    })
   .catch(error =>
     //console.error(error)
     alert(error)
     );
     this.cardnum="";
     this.key = "";
     this.month="";
     this.year="";
     await loading.present();
}

}
