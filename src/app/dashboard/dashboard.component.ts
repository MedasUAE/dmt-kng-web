import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskName = '';
  task1 = "";
  task2 = "";
  task3 = "";
  task4 = "";

  title = ' Welcome To Dashboard  Data Migration Tool';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.taskName = params['task_name']; //taking value from  parameter task_name
      console.log("taskName 123" + this.taskName);
      if (this.taskName === 'mysqlConnection') {
        this.task1 = this.taskName;
      }
      if (this.taskName === 'hanaConnection') {
        this.task2 = this.taskName;
        this.task1 = 'mysqlConnection';
      }

      if (this.taskName === 'createTables') {
        this.task3 = this.taskName;
        this.task1 = 'mysqlConnection';
        this.task2 = 'hanaConnection';
      }
      if (this.taskName === 'insertData') {
        this.task4 = this.taskName;
        this.task1 = 'mysqlConnection';
        this.task2 = 'hanaConnection';
        this.task3 = 'createTables';
      }

    });

  }

}
