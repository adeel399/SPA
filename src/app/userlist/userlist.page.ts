import { Component, OnInit } from '@angular/core';
import {  HttpHeaders, HttpErrorResponse,HttpClient, } from '@angular/common/http';
import { NavController,LoadingController,AlertController,ActionSheetController,ModalController} from '@ionic/angular';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {
  rootapi =  "https://sharedphotoalbums.com/webapi/api/";
  userid: string;
  subscriptionlist: any;
  pkgdetail: any;
  AlbumID: string;
  constructor(public http: HttpClient,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public alertController:AlertController,
    public modalController:ModalController,
    public router : Router,
    public activatedRoute : ActivatedRoute,
    private navCtrl:NavController) {
      this.userid = localStorage.getItem("userid");
      this.AlbumID=this.activatedRoute.snapshot.paramMap.get('modelName');
     }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : '1eee32a8-aa03-47be-a902-9b0201cd1b23'
      })
    }

  back(){
      this.navCtrl.navigateForward('/tabs/tab1'); 
  }
  ngOnInit() {
  }

}
