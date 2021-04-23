import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController,PopoverController,AlertController ,NavParams,LoadingController, ModalController} from '@ionic/angular';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sharevia',
  templateUrl: './sharevia.page.html',
  styleUrls: ['./sharevia.page.scss'],
})
export class ShareviaPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  albumid: any;
  sharingMsg: any;

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
    this.sharingMsg=this.navParams.get('shareMsg');
    console.log(this.sharingMsg);
   }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
    })
  }
  ngOnInit() {
  }

   whatsapp(){
    console.log(this.sharingMsg);
   this.socialSharing.shareViaWhatsApp(this.sharingMsg, '', '');
   this.modalController.dismiss({
    'dismissed': true
  });
 
}
email(){
  console.log(this.sharingMsg);
  this.socialSharing.shareViaEmail(this.sharingMsg, '', ['']);
  this.modalController.dismiss({
    'dismissed': true
  });
}
msg(){
  console.log(this.sharingMsg);
  this.socialSharing.shareViaSMS(this.sharingMsg, '');
  this.modalController.dismiss({
    'dismissed': true
  });
}

}
