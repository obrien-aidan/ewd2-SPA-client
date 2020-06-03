import { bindable } from 'aurelia-framework';
import { Candidate } from '../../services/island-types';

export class CandidateForm {
  firstName: string;
  lastName: string;
  office: string;
  @bindable
  candidates: Candidate[];

  addCandidate() {
    const candidate = {
      firstName: this.firstName,
      lastName: this.lastName,
      office: this.office
    };
    this.candidates.push(candidate);
    console.log(candidate);
  }
}
