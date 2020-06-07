import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Island, User } from './island-types';
import { HttpClient } from 'aurelia-http-client';
import ImageStore from './image-store'
import * as environment from '../../config/environment.json';

@inject(HttpClient, Aurelia, Router, ImageStore)
export class IslandService {
  //users: Map<string, User> = new Map();
  islands: Island[] = [];
  provence = ['Munster', 'Ulster', 'Leinster', 'Connacht'];
  //usersById: Map<string, User> = new Map();



  constructor(private httpClient: HttpClient, private au: Aurelia, private router: Router) {
    httpClient.configure((http) => {
      http.withBaseUrl('http://localhost:3000');
      //http.withBaseUrl('https://broadleaf-clover-aunt.glitch.me');h
    });
  }

  async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile[0]);
    formData.append('upload_preset', `${environment.cloudinary.preset}`);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${environment.cloudinary.name}/upload`, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData
      });
      const content = await response.json()
      return content.url
    } catch (err) {
      console.log(err);
    }
  }

  async addIsland(name: string, description: string, provence: string, image: File) {

    const response = await this.httpClient.get('/api/user')
    const imageUrl = await this.uploadImage(image)

    const user: User = response.content
    const island = {
      name: name,
      description: description,
      provence: provence,
      user: user.firstName,
      image: imageUrl

    };
    await this.httpClient.post('/api/users/' + user._id + '/islands', island);
    alert("Island added successfully")
    // this.getIslands()
    this.islands.push(island);
    //this.total = this.total + amount;
    //this.ea.publish(new TotalUpdate(this.total));
    //console.log('Total so far ' + this.total);
  }

 async getIslands() {
   const response = await this.httpClient.get('/api/islands');
   const rawIslands: Island[] = await response.content;

   console.log(rawIslands)
   rawIslands.forEach(rawIsland => {
     const island = {
       name: rawIsland.name,
       image: rawIsland.image,
       description: rawIsland.description,
       provence : rawIsland.provence,
//       user: rawIsland.user//this.usersById.get(rawIsland.user)
        // candidate :this.candidates.find(candidate => rawDonation.candidate == candidate._id),
     }
     this.islands.push(island);
   });
 }
  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }
  async login(email: string, password: string) {
    let success = false;
    try {
      const response = await this.httpClient.post('/api/users/authenticate', { email: email, password: password });
      const status = await response.content;
      if (status.success) {
        this.httpClient.configure((configuration) => {
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });
        localStorage.islands = JSON.stringify(response.content);
        await this.getIslands();
        this.changeRouter(PLATFORM.moduleName('app'));
        success = status.success;
      }
    } catch (e) {
     success = false;
    }
   return success;
  }

  logout() {
    localStorage.island = null;
    this.httpClient.configure((configuration) => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }
 // async login(email: string, password: string) {
 //   const user = this.users.get(email);
 //   if (user && (user.password === password)) {
 //     this.changeRouter(PLATFORM.moduleName('app'))
 //     return true;
 //   } else {
 //     return false;
 //   }
 // }

 // logout() {
 //   this.changeRouter(PLATFORM.moduleName('start'))
 // }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.island !== 'null') {
      authenticated = true;
      this.httpClient.configure((http) => {
        const auth = JSON.parse(localStorage.island);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }
  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

}
