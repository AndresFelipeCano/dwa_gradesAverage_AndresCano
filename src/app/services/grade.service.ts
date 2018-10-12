import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import { Grade } from '../models/grades';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  gradeList: AngularFireList<any>;
  selectedGrade: Grade = new Grade();
  
  constructor(private firebase: AngularFireDatabase) { }

  getGrades(){
    
    return this.gradeList = this.firebase.list('grades');
    
  }
  insertGrade(grade: Grade){
    this.gradeList.push({
      name: grade.name,
      description: grade.description,
      value: grade.value,
      percentage: grade.percentage
      //$subjectKey: grade.$subjectKey
    })
  }

  updateGrade(grade: Grade){
    this.gradeList.update(grade.$key, {
      name: grade.name,
      description: grade.description,
      value: grade.value,
      percentage: grade.percentage,
      //$subjectKey: grade.$subjectKey
    });
  }

  deleteGrade($key: string){
    this.gradeList.remove($key);
  }
}
