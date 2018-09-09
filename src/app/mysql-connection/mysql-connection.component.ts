import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataMigrationService } from '../services/dataMigrationService';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mysql-connection',
  templateUrl: './mysql-connection.component.html',
  styleUrls: ['./mysql-connection.component.css']
})
export class MysqlConnectionComponent implements OnInit {
  mysqlConnectionForm: FormGroup;
  responseObj: any = {};


  constructor(private fb: FormBuilder, private dataMigrationService: DataMigrationService, private router: Router, private location: Location) {
    this.mysqlConnectionForm = fb.group({
      idAddress: ['', Validators.required],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      port: ['', [Validators.required]],
      db: ['', [Validators.required]],
    });

  }
  ngOnInit() {
  }
  getFormData(formData) {
    this.dataMigrationService.getMysqlConnection(formData)
      .then((results: any) => {
        this.responseObj = results;
        if (results.responseMessage.errorCode === 'ENOTFOUND' && !results.responseMessage.taskName) {
          alert("Plz Enter Correct IP Address it is Wrong : " + formData.idAddress);
          this.router.navigate(['/dashboard', results.responseMessage.taskName]);
          location.reload()
        } else if (results.responseMessage.errorCode === 'ECONNREFUSED' && !results.responseMessage.taskName) {
          alert("Plz Enter Correct Port Number  it is Wrong :" + formData.port);
          this.router.navigate(['/dashboard', results.responseMessage.taskName]);
          location.reload()
        } else if (results.responseMessage.errorCode === 'ER_DBACCESS_DENIED_ERROR' && !results.responseMessage.taskName) {
          alert("Plz Enter Correct User Name  it is Wrong :" + formData.name);
          this.router.navigate(['/dashboard', results.responseMessage.taskName]);
          location.reload()
        } else if (results.responseMessage.errorCode === 'ER_ACCESS_DENIED_ERROR' && !results.responseMessage.taskName) {
          alert("Plz Enter Correct Password  it is Wrong :" + formData.password);
          this.router.navigate(['/dashboard', results.responseMessage.taskName]);
          location.reload()
        } else if (results.responseMessage.errorCode === 'ER_BAD_DB_ERROR' && !results.responseMessage.taskName) {
          alert("Plz Enter Correct Database Name it is Wrong :" + formData.db);
          this.router.navigate(['/dashboard', results.responseMessage.taskName]);
          location.reload()
        }
        else if (results.responseMessage.taskName) {
          console.log(results.responseMessage.taskName);
          alert("Connected successfully with Mysql Database: " + formData.db);
          this.router.navigate(['/dashboard', results.responseMessage.taskName]);
        }
      }).catch((error) => console.error(error));
  }
}
