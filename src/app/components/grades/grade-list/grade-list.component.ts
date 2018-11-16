import { Component, OnInit } from '@angular/core';

//service
import { GradeService } from '../../../services/grade.service';
import { ToastrService } from 'ngx-toastr';
//product
import { Grade } from '../../../models/grades';
@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {

  public promedioPonderado = 0;
  public promedioAcumulado = 0;
  public puntosPosibles = 0;
  public porcentajeActual = 0;
  gradeList: Grade[];
  constructor(
    private gradeService: GradeService,
    private toastrService: ToastrService
    ) {
        this.gradeService.getGrades().snapshotChanges().subscribe(item =>{
        this.gradeList = [];
        this.promedioPonderado = 0;
        this.promedioAcumulado = 0;
        this.puntosPosibles = 0;
        this.porcentajeActual = 0;
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.gradeList.push(x as Grade);
          this.promedioAcumulado += x["value"]*(x["percentage"]/100);
          this.promedioPonderado += x["value"]*(x["percentage"]/100);
          this.puntosPosibles += 5*(x["percentage"]/100);
          this.porcentajeActual += x["percentage"]/100;
        });
        if(this.gradeList.length > 0){
          this.promedioPonderado /= this.porcentajeActual;
        }
      });
     }

  ngOnInit() {
    
  }
  onEdit(grade: Grade){
    this.gradeService.selectedGrade = Object.assign({}, grade);
  }
  onDelete($key: string){
    if(confirm('Are you sure you want to delete?')){    
      this.gradeService.deleteGrade($key);
      this.toastrService.success("Successfull Operation", "Grade Deleted");
    }
    if(this.gradeList.length > 0){
      this.promedioPonderado /= this.gradeList.length;
    }
    else{
      this.promedioPonderado = 0;
    }
  }

}
