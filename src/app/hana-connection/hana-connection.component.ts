import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataMigrationService } from '../services/dataMigrationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hana-connection',
  templateUrl: './hana-connection.component.html',
  styleUrls: ['./hana-connection.component.css']
})
export class HanaConnectionComponent implements OnInit {
  hanaConnectionForm: FormGroup;
  constructor(private fb: FormBuilder, private dataMigrationService: DataMigrationService, private router: Router) {
    this.hanaConnectionForm = fb.group({
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
    this.dataMigrationService.getHanaConnection(formData)
      .then((result: any) => {
        if (result.responseMessage.errorCode === 'EHDBOPENCONN' && !result.responseMessage.taskName) {
          alert(formData.idAddress + ": IP Address Wrong   OR  " + formData.port + "port No  Wrong");
          this.router.navigate(['/dashboard', result.responseMessage.taskName]);
          location.reload()
        } else if (result.responseMessage.errorCode === 10 && !result.responseMessage.taskName) {
          alert(formData.name + " : User Name Wrong   OR   " + formData.password + "  password  Wrong");
          this.router.navigate(['/dashboard', result.responseMessage.taskName]);
          location.reload()
        }
        else if (result.responseMessage.taskName) {
          alert("Connected successfully with SAP Hana Database : " + formData.db);
          this.router.navigate(['/dashboard', result.responseMessage.taskName]);
        }
      }).catch((error) => console.error(error));
  }


}
