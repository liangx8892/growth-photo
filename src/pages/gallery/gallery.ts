import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {

  @Input() photoPath: string;

  constructor(public navCtrl: NavController, private file: File) {

  }

  takePhoto() {
  /*
	const options: CameraOptions = {
	  quality: 100,
	  destinationType: this.camera.DestinationType.FILE_URI,
	  encodingType: this.camera.EncodingType.JPEG,
	  mediaType: this.camera.MediaType.PICTURE
	}
	
	this.camera.getPicture(options).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64:
	 this.photoPath = imageData;
	}, (err) => {
	 // Handle error
	});
	*/
	this.photoPath = this.file.applicationDirectory;
  }
}
