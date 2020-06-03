import { bindable } from 'aurelia-framework';
import { Candidate } from '../../services/island-types';

export class CandidateList {
  @bindable
  candidates: Candidate[];
}
