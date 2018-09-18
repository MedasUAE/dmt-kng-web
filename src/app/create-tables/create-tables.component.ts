import { Component, OnInit } from '@angular/core';
import { DataMigrationService } from '../services/dataMigrationService';
import { NgxSpinnerService } from 'ngx-spinner';

import * as commonUtil from '../utils/commonUtil';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-tables',
    templateUrl: './create-tables.component.html',
    styleUrls: ['./create-tables.component.css']

})
export class CreateTablesComponent implements OnInit {
    tableNameList = [];
    selectedTableNameList = [];
    settings = {};
    isRemoveExistingTables: boolean = false;

    constructor(private dataMigrationService: DataMigrationService, private router: Router, private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.dataMigrationService.getTableNameList()
            .then((results: any[]) => {
                this.formateResults(results);
            }).catch((error) => console.error(error));

        // this.selectedTableNameList = [    { "id": 4, "itemName": "account_hierarchy_flow" }  ];
        this.selectedTableNameList = [];
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
        // console.log(this.selectedTableNameList);
    }
    onSelectAll(items: any) {
        //console.log(items);

    }
    onDeSelectAll(items: any) {
        //console.log(items);
    }
    removeExistingTables(isRemoveExistingTables: any) {
        // console.log(isRemoveExistingTables);

    }

    createSelectedTables() {
        //this.spinner.show();
        let dataList: any[] = [];
        dataList[0] = this.selectedTableNameList;
       this.showLoader(this.selectedTableNameList);
        dataList[1] = this.isRemoveExistingTables;
        this.dataMigrationService.createSelectedTables(dataList)
            .then((result: any) => {
                if (result.responseMessage.taskName) {
                    alert("Selected tables are created successfully");
                    //this.spinner.hide();
                     
                    this.router.navigate(['/dashboard', result.responseMessage.taskName]);
                }
            }).catch((error) => console.error(error));
    }

    showLoader(selectedTableNameList){
        let tableCount=selectedTableNameList.length;
          if(tableCount>0 && tableCount<=5){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*1 ms=1 minute */
                     this.spinner.hide();
                 },  60000);
        } else if(tableCount>5 && tableCount<=10){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*2 ms=2 minutes */
                     this.spinner.hide();
                 }, 120000);
        } else if(tableCount>10 && tableCount<=20){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*4 ms=4 minutes */
                     this.spinner.hide();
                 }, 1000*60*4);
        } else if(tableCount>20 && tableCount<=50){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*10 ms=10 minutes */
                     this.spinner.hide();
                 }, 1000*60*10);
        } else if(tableCount>50 && tableCount<=100){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*25 ms=25 minutes */
                     this.spinner.hide();
                 }, 1000*60*25);
        } else if(tableCount>100 && tableCount<=200){
            this.spinner.show();
            setTimeout(() => {
                    /** spinner ends after 1000*60*40 ms=40 minutes */
                     this.spinner.hide();
                 }, 1000*60*40);
        } 
        else{
            this.spinner.show();
            setTimeout(() => {
                /** spinner ends after 1000*60*60 ms=60 minutes */
                 this.spinner.hide();
             }, 1000*60*60);
        }

    }


}