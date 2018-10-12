import { Component, OnInit } from '@angular/core';

//service
import {GradeService} from '../../../services/grade.service';
import { NgForm } from '@angular/forms';
import { Grade } from '../../../models/grades';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  constructor(
    public gradeService: GradeService,
    public toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.gradeService.getGrades();
    this.resetForm();
  }
  resetForm(gradeForm?: NgForm){
    if(gradeForm != null){
      gradeForm.reset();
      this.gradeService.selectedGrade = new Grade();

    }
  }
  onSubmit(gradeForm: NgForm){
    if(gradeForm.value.$key == null){ //create new product
      this.gradeService.insertGrade(gradeForm.value);
      this.toastrService.success('Successfull Operation', 'Grade created!');
    }
    else{
      this.gradeService.updateGrade(gradeForm.value);
      this.toastrService.success('Successfull Operation', 'Grade altered!');
    }
    
    this.resetForm(gradeForm);
  }
  
}
