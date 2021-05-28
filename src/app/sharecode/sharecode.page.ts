import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-sharecode',
  templateUrl: './sharecode.page.html',
  styleUrls: ['./sharecode.page.scss'],
})
export class SharecodePage implements OnInit {
  sharingMsg: any;

  constructor(private socialSharing: SocialSharing,
    private activatedRoute: ActivatedRoute,
    public navParams : NavParams,
    public modalController:ModalController,
    private route: Router,) {
      this.sharingMsg=this.navParams.get('sharemsg');
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
