import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, ModalController } from 'ionic-angular';
import { PhotoModel } from '../../models/photo-model';
import { SimpleAlertProvider } from '../../providers/simple-alert/simple-alert';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { DataProvider } from '../../providers/data/data';

declare var cordova;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loaded: boolean = false;
  photoTaken: boolean = false;
  photos: PhotoModel[] = [];

  constructor(public dataService: DataProvider, public platform: Platform,
    public simpleAlert: SimpleAlertProvider, public modalCtrl:
      ModalController, public alertCtrl: AlertController, public camera:
      Camera, public file: File) {

  }

  ionViewDidLoad() {
    // Uncomment to use test data
    /*this.photos = [
    new PhotoModel('http://placehold.it/100x100', new Date()),
    new PhotoModel('http://placehold.it/100x100', new Date()),
    new PhotoModel('http://placehold.it/100x100', new Date())
    ]*/

    this.platform.ready().then(() => {
      this.loadPhotos();
    });

    this.platform.resume.subscribe(() => {
      if (this.photos.length > 0) {
        let today = new Date();
        if (this.photos[0].date.setHours(0,0,0,0) == today.setHours(0,0,0,0)){
          this.photoTaken = true;
        }else{
          this.photoTaken = false;
        }
      }
    })
  }

  loadPhotos(): void {
  }
  takePhoto(): any {
  }
  createPhoto(photo): void {
  }
  removePhoto(photo): void {
  }
  playSlideshow(): void {
  }
  sharePhoto(image): void {
  }
  save(): void {
  }

}
