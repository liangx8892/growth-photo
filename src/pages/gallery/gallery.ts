import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Pro } from '@ionic/pro';
import { GalleryService } from '../../services/gallery.srv';
import { SettingsService } from '../../services/settings.srv';
import { AlertController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {

  private photos = [];
  private settings = {};
  constructor(public navCtrl: NavController, private file: File,
    private filePath: FilePath, private camera: Camera,
    private galleryService: GalleryService,
    private settingsService: SettingsService,
    private alertCtl: AlertController,
    private photoViewer: PhotoViewer) {
      this.initialize();
  }

  viewPhoto(photo) {
    this.photoViewer.show(photo.localPath, photo.title, {share: false});
  }

  takePhoto(sourceType) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    }

    this.camera.getPicture(options).then((imagePath) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      this.filePath.resolveNativePath(imagePath)
        .then(photoPath => {
          let originalPath = photoPath.substr(0, photoPath.lastIndexOf('/') + 1);
          let originalFileName = photoPath.substr(photoPath.lastIndexOf('/') + 1, photoPath.length);
          let originalPathWithoutSlash = originalPath.substr(0, originalPath.length - 1);
          let newPath = originalPathWithoutSlash.substr(0, originalPathWithoutSlash.lastIndexOf('/') + 1) + 'files';


          let now = new Date();
          let dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '');
          let timeStr = now.toLocaleTimeString('zh-CN', { hour12: false }).replace(/:/g, '');
          let newName = dateStr + timeStr + '.jpg';
          this.file.moveFile(originalPath, originalFileName, newPath, newName).then(
            entry => {
              var photo = {
                localPath: entry.nativeURL,
                createDate: now
              }

              this.galleryService.savePhoto(photo).subscribe(
                data => {
                  photo['_id'] = data['photoId'];
                  photo['title'] = this.galleryService.generateTitle(photo, this.settings);

                  this.photos.unshift(photo);
                },
                error => {
                  console.error('get photos failed:', error);
                }
              );
              
              //Pro.monitoring.log('Image moved, entry:' + JSON.stringify(entry), { level: 'info' });
            }
          ).catch(
            err => {
              console.error(err);
            }
            );
        })
        .catch(err => console.error(err));



    }, (err) => {
      // Handle error
    });
  }

  deletePhoto(photo) {
    let self = this;
    let confirm = this.alertCtl.create({
      title: '删除提醒',
      message: '确定删除这张照片吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            let filePath = photo.localPath.substr(0,photo.localPath.lastIndexOf('/')+1);
            let fileName = photo.localPath.substr(photo.localPath.lastIndexOf('/')+1,photo.localPath.length);
            self.galleryService.deletePhoto(photo._id).subscribe(
              data => {
                let deleteIndex = -1;
                self.photos = self.photos.filter((photoInArray) => {
                  return photoInArray._id !== photo._id
                });
                self.file.checkFile(filePath, fileName).then(exists => {
                  if(exists){
                    self.file.removeFile(filePath, fileName).then((result) => {});
                  }
                });
              },
              error => {
                console.error('get photos failed:', error);
              }
            );
          }
        }
      ]
    });
    confirm.present();

  }

  saveDescription(photo) {
    this.galleryService.updatePhoto(photo).subscribe(
      data => {

      },
      error => {
        console.error('update photos failed:', error);
      }
    );
  }

  initialize() {
    this.settings = this.settingsService.getSettingsFromCache();
    this.galleryService.getPhotos().subscribe(
      data => {
        if (data && data instanceof Array && data.length > 0) {
          this.photos = data;
          this.photos.forEach((photo) => {
            photo['title'] = this.galleryService.generateTitle(photo, this.settings);
          });
        }
      },
      error => {
        console.error('get photos failed:', error);
      }
    );
  }
}
