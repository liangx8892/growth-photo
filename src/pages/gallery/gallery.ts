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
        let originalPath = photoPath.substr(0, photoPath.lastIndexOf('/') + 1);
        let originalFileName = photoPath.substr(photoPath.lastIndexOf('/') + 1, photoPath.length);
        let originalPathWithoutSlash = originalPath.substr(0, originalPath.length - 1);
        let newPath = originalPathWithoutSlash.substr(0, originalPathWithoutSlash.lastIndexOf('/')+1) + 'files';

        
        let now = new Date();
        let dateStr = now.toLocaleDateString('zh-CN',{year:'numeric',month:'2-digit', day:'2-digit'}).replace(/\//g, '');
        let timeStr = now.toLocaleTimeString('zh-CN',{hour12:false}).replace(/:/g, '');
        let newName = dateStr + timeStr + '.jpg';
        this.file.moveFile(originalPath, originalFileName, newPath, newName).then(
        	(entry) => {
        		Pro.monitoring.log('Image moved, entry:'+JSON.stringify(entry), {level: 'info'});
        		this.photoPath = entry.nativeURL;
        	}
        ).catch(
        	err => {
        		Pro.monitoring.exception(err);
        	}
        );
      })
      .catch(err => Pro.monitoring.exception(err));
    

	 
	}, (err) => {
	 // Handle error
	});
  }
}
