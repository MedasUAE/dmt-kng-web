import { Component, OnInit } from '@angular/core';
import { DataMigrationService } from '../services/dataMigrationService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-insert-data',
    templateUrl: './insert-data.component.html',
    styleUrls: ['./insert-data.component.css']
})
export class InsertDataComponent implements OnInit {
    tableNameList = [];
    selectedTableNameList = [];
    settings = {};
    constructor(private dataMigrationService: DataMigrationService, private router: Router) { }

    ngOnInit() {

        this.dataMigrationService.getTableNameList()
            .then((results: any[]) => {
                this.formateResults(results);
            }).catch((error) => console.error(error));
        this.selectedTableNameList = [
            //     { "id": 1, "itemName": "account_child" }
        ];
        this.settings = {
            text: "Select Table Names",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: "myclass custom-class"
        };
    }

    formateResults(results) {
        for (let i = 0; i < results.length; i++) {
            this.tableNameList.push({ "id": i + 1, "itemName": results[i].Tables_in_eclinic_kng });
        }
    }
    onItemSelect(item: any) {
        //console.log(item);
        //console.log(this.selectedTableNameList);
    }
    OnItemDeSelect(item: any) {
        //console.log(item);
        //console.log(this.selectedTableNameList);
    }
    onSelectAll(items: any) {
        //console.log(items);

    }
    onDeSelectAll(items: any) {
        //console.log(items);
    }

    insertDataInSelectedTables() {
        this.dataMigrationService.insertDataInSelectedTables(this.selectedTableNameList)
            .then((result: any) => {
                if (result.responseMessage.taskName) {
                    console.log(result.responseMessage.taskName);
                    alert("Data are inserting in selected Sap Hana tables");
                    this.router.navigate(['/dashboard', result.responseMessage.taskName]);
                }
            }).catch((error) => console.error(error));
    }

}
