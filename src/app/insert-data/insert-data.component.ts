import { Component, OnInit } from '@angular/core';
import { DataMigrationService } from '../services/dataMigrationService';
import * as commonUtil from '../utils/commonUtil';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-insert-data',
    templateUrl: './insert-data.component.html',
    styleUrls: ['./insert-data.component.css']
})
export class InsertDataComponent implements OnInit {
    tableNameList = [];
    selectedTableNameList = [];
    settings = {};
    isRemoveExistingRecords: boolean = false;
    constructor(private dataMigrationService: DataMigrationService, private router: Router, private spinner: NgxSpinnerService) { }

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
        let firstObj = commonUtil.objToString(results[0]);
        for (let i = 0; i < results.length; i++) {
            this.tableNameList.push({ "id": i + 1, "itemName": results[i][firstObj.substring(0, firstObj.indexOf(":"))] });
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
    removeExistingRecords(isRemoveExistingRecords: any) {
        //console.log(isRemoveExistingRecords);

    }

    insertDataInSelectedTables() {
        // this.spinner.show();
        let dataList: any[] = [];
        dataList[0] = this.selectedTableNameList;
        dataList[1] = this.isRemoveExistingRecords;

        //this.selectedTableNameList.push({"isRemoveExistingTables":this.isRemoveExistingTables});
        console.log(dataList);
        this.dataMigrationService.insertDataInSelectedTables(dataList)
            .then((result: any) => {
                if (result.responseMessage.taskName) {
                    //this.spinner.hide();
                    this.showLoader(this.selectedTableNameList);
                    alert("Data are inserting in selected Sap Hana tables");
                    //this.router.navigate(['/dashboard', result.responseMessage.taskName]);
                }
            }).catch((error) => console.error(error));
    }
    moveToDashboard(){
        this.router.navigate(['/dashboard', '']);  
    }

    showLoader(selectedTableNameList){
        
        if(selectedTableNameList.length>0 && selectedTableNameList.length<=5){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*1 ms=1  menute */
                     this.spinner.hide();
            },  1000*60*1);
        } else if(selectedTableNameList.length>5 && selectedTableNameList.length<=10){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*10 ms=10 minutes */
                     this.spinner.hide();
                 }, 1000*60*10);
        } else if(selectedTableNameList.length>10 && selectedTableNameList.length<=20){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*20 ms=20 minutes */
                     this.spinner.hide();
                 }, 1000*60*20);
        } else if(selectedTableNameList.length>20 && selectedTableNameList.length<=50){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*50 ms=50 minutes */
                     this.spinner.hide();
                 }, 1000*60*50);
        } else if(selectedTableNameList.length>50 && selectedTableNameList.length<=100){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*100 ms=100 minutes */
                     this.spinner.hide();
                 }, 1000*60*100);
        } else{
            this.spinner.show();
            setTimeout(() => {
                /** spinner ends after 1000*60*200 ms=200 minutes */
                 this.spinner.hide();
             }, 1000*60*200);
        }

    }
    


}
