import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Island, User } from '../../services/island-types';
import {IslandService} from "../../services/island-service";

@inject(IslandService)
export class IslandForm {
  @bindable
  islands: Island[] = [];
  @bindable
  provence: string[];

  name = '';
  description = '';
  image = null;
  selectedProvence = '';

  constructor(private ds: IslandService) { }

  addIsland(){
      this.ds.addIsland(
      this.name, this.description, this.selectedProvence, this.image,
      )
    }
}
