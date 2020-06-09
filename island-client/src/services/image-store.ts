//delete page
import * as environment from '../../config/environment.json';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';

interface Image {
  url: string;
  id: string;
}

@autoinject
export default class ImageStore {
  images: Image[] = [];

  constructor(private http: HttpClient) {
  }

  getAllImages(): Image[] {
    return this.images;
  }

  async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', `${environment.cloudinary.preset}`);

    try {
      const response = await this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinary.name}/image/upload`, formData);
      return response.content.url
    } catch (err) {
      console.log(err);
    }
  }

  deleteImage(id) { }
}
