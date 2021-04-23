import { Component, OnInit } from '@angular/core';
import { NavController,PopoverController,AlertController ,NavParams,LoadingController, ModalController} from '@ionic/angular';
import {  HttpHeaders, HttpErrorResponse,HttpClient } from '@angular/common/http';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imgmodel',
  templateUrl: './imgmodel.page.html',
  styleUrls: ['./imgmodel.page.scss'],
})
export class ImgmodelPage implements OnInit {
  imgs: any;
  User: any;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  firstimg: any;
  constructor(private navCtrl:NavController,
    public alertController: AlertController,
    public navParams : NavParams,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    public modalController:ModalController,
    private route: Router,
    public http: HttpClient,
    public popoverController: PopoverController) { 
    this.imgs=this.navParams.get('photos');
    this.firstimg=this.navParams.get('first');
    console.log(this.firstimg)
  }

  ngOnInit() {
  }

}
