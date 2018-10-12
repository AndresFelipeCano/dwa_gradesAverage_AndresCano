import { Component, OnInit } from '@angular/core';

//service
import {GradeService} from '../../../services/grade.service';
import {ToastrService} from 'ngx-toastr';
//product
import {Grade} from '../../../models/grades';
@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {

  gradeList: Grade[];
  constructor(
    private gradeService: GradeService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.gradeService.getGrades().snapshotChanges().subscribe(item =>{
      this.gradeList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.gradeList.push(x as Grade);
      })
    });
  }
  onEdit(grade: Grade){
    this.gradeService.selectedGrade = Object.assign({}, grade);
  }
  onDelete($key: string){
    if(confirm('Are you sure you want to delete?')){    
      this.gradeService.deleteGrade($key);
      this.toastrService.success("Successfull Operation", "Grade Deleted");
    }
  }

}
