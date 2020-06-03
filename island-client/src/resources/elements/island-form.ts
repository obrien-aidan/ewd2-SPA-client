import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Island, User } from '../../services/island-types';
import {IslandService} from "../../services/island-service";


@inject(IslandService)
export class IslandForm {
  @bindable
  islands: Island[] = [];
  //@bindable
  //users: User[] = [];
  @bindable
  provence: string[];

  name = '';
  description = '';
  image = '';
  selectedProvence = '';
  //user=User;

  addIsland() {
    const island = {
      name: this.name,
      image: this.image,
      description: this.description,
      provence: this.selectedProvence,
      //user: this.user,
    };
    this.islands.push(island);
    console.log(this.islands);
  }
}
