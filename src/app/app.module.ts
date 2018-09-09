
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
 
import { AppComponent } from './app.component';
import { AppRoutingModule }  from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MysqlConnectionComponent } from './mysql-connection/mysql-connection.component';
import { HanaConnectionComponent } from './hana-connection/hana-connection.component';
import { DataMigrationService } from './services/dataMigrationService';
import { CreateTablesComponent } from './create-tables/create-tables.component';
import { InsertDataComponent } from './insert-data/insert-data.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateTablesComponent,
    InsertDataComponent,
    MysqlConnectionComponent,
    HanaConnectionComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,
    RouterModule,AppRoutingModule,AngularMultiSelectModule 
  ],
  providers: [DataMigrationService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
