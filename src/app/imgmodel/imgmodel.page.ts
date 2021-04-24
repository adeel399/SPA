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
  id: any;
  User: any;
  slideOpts:any = {
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
    public popoverController: PopoverController
  ) { 
    this.imgs = this.navParams.get('src');
    this.id = this.navParams.get('id');
    this.slideOpts['initialSlide'] = this.id
    console.log(this.slideOpts)
  }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

}
