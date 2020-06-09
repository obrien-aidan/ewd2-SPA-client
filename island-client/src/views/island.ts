import { inject } from 'aurelia-framework';
import { Island } from "../services/island-types";
import {IslandService} from "../services/island-service";

@inject(IslandService)
export class islandClass {
  islands: Island[];
  provence: string[];

  //candidates: Candidate[];

  constructor(private ds: IslandService) {
    //this.candidates = ds.candidates;
    this.islands = ds.islands;
    this.provence = ds.provence;
  }

}
