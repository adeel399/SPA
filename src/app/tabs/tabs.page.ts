import { Component ,ViewChild} from '@angular/core';
import {NavController, IonTabs,ModalController } from '@ionic/angular';
import { AddAlbumPage } from '../add-album/add-album.page';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('myTabs', {static: false}) myTabs: IonTabs;
  constructor(private navCtrl: NavController,public modalController: ModalController) {}
  tabChanged() {
    var currentTab: string = this.myTabs.getSelected();
    this.navCtrl.navigateRoot('tabs/' + currentTab);
  }



}
