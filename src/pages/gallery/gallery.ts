import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Pro } from '@ionic/pro';

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
	Pro.monitoring.log('applicationDirectory:'+ this.file.applicationDirectory, { level: 'info' });
	Pro.monitoring.log('applicationStorageDirectory:'+ this.file.applicationStorageDirectory, { level: 'info' });
	Pro.monitoring.log('cacheDirectory:'+ this.file.cacheDirectory, { level: 'info' });
	Pro.monitoring.log('dataDirectory:'+ this.file.dataDirectory, { level: 'info' });
	this.photoPath = this.file.cacheDirectory;
  }
}
