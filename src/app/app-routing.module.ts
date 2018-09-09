
import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MysqlConnectionComponent } from './mysql-connection/mysql-connection.component';
import { HanaConnectionComponent } from './hana-connection/hana-connection.component';
import { CreateTablesComponent } from './create-tables/create-tables.component';
import { InsertDataComponent } from './insert-data/insert-data.component';


const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'dashboard/:task_name', component: DashboardComponent },
  { path: 'mysqlConnection', component: MysqlConnectionComponent },
  { path: 'hanaConnection', component: HanaConnectionComponent },
  { path: 'createtables', component: CreateTablesComponent },
  { path: 'insertdata', component: InsertDataComponent },
  		  
	
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ }
