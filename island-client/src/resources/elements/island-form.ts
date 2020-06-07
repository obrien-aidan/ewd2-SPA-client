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

  constructor(private ds: IslandService) { }


  name = '';
  description = '';
  image = null;
  selectedProvence = '';

  async addIsland() {
    const island = {
      name: this.name,
      image: this.image,
      description: this.description,
      provence: this.selectedProvence,
      //user: this.user,
    };

    // this.islands.push(island);
    const success = await this.ds.addIsland(
      this.name, this.description, this.selectedProvence, this.image,
    )

    this.name = '';
    this.description = '';
    this.image = '';
    this.selectedProvence = '';
  }
}
