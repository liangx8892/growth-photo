import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Pro } from '@ionic/pro';

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {

  @Input() photoPath: string;

  constructor(public navCtrl: NavController, private file: File, private filePath: FilePath, private camera: Camera) {

  }

  takePhoto() {
    this.filePath.resolveNativePath(this.file.dataDirectory).then((dataDirectory) => {
      Pro.monitoring.log('dataDirectory:' + dataDirectory, {level: 'info'});
    });
    
    
	const options: CameraOptions = {
	  quality: 100,
	  destinationType: this.camera.DestinationType.FILE_URI,
	  encodingType: this.camera.EncodingType.JPEG,
	  mediaType: this.camera.MediaType.PICTURE
	}
	
	this.camera.getPicture(options).then((imagePath) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64:
	 
	  this.filePath.resolveNativePath(imagePath)
      .then(photoPath => {
        this.photoPath = photoPath; 
        Pro.monitoring.log('photoPath:' + this.photoPath, {level: 'info'});    
      })
      .catch(err => console.log(err));
    

	 
	}, (err) => {
	 // Handle error
	});

	this.photoPath = this.file.cacheDirectory;
  }
}
