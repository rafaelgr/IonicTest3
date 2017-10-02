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
        if (this.photos[0].date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
          this.photoTaken = true;
        } else {
          this.photoTaken = false;
        }
      }
    })
  }

  loadPhotos(): void {
  }
  takePhoto(): any {
    if (!this.loaded || this.photoTaken) {
      return false;
    }
    if (!this.platform.is('cordova')) {
      console.log('You can only take photos on a device!');
      return false;
    }
    let options = {
      quality: 100,
      destinationType: 1, //return a path to the image on the device
      sourceType: 1, //use the camera to grab the image
      encodingType: 0, //return the image in jpeg format
      cameraDirection: 1, //front facing camera
      saveToPhotoAlbum: true //save a copy to the users photo album as well
    };

    this.camera.getPicture(options).then(
      (imagePath) => {
        console.log(imagePath);
        let currentName = imagePath.replace(/^.*[\\\/]/, '');
        let d = new Date(),
          n = d.getTime(),
          newFileName = n + '.jpg';
        if (this.platform.is('ios')) {
          this.file.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName)
            .then((success: any) => {
              this.photoTaken = true;
              this.createPhoto(success.nativeURL);
              this.sharePhoto(success.nativeURL);
            }, (err) => {
              console.log(err);
              let alert = this.simpleAlert.create('Oopps', 'Something went worng');
              alert.present();
            });
        } else {
          this.photoTaken = true;
          this.createPhoto(imagePath);
          this.sharePhoto(imagePath);
        }
      },
      (err) => {
        let alert = this.simpleAlert.create('Oops!', 'Something went  wrong.');
        alert.present();
      }
    );
  }
  createPhoto(photo): void {
    let newPhoto = new PhotoModel(photo, new Date());
    this.photos.unshift(newPhoto);
    this.save();
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
