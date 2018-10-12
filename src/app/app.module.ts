import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';

//firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';

//components
import { GradesComponent } from './components/grades/grades.component';
import { GradeListComponent } from './components/grades/grade-list/grade-list.component';
import { GradeComponent } from './components/grades/grade/grade.component';


//services
import { GradeService } from './services/grade.service';

//animations
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    GradeComponent,
    GradeListComponent,
    GradesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    GradeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
