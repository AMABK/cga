import {ElementSelectionService} from './../../../element-selection.service';
import {ComponentInspectorService} from './../../../component-inspector.service';
import {Functions} from './../../../_helpers/functions';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControlOptions, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-associate-managers',
  templateUrl: './associate-managers.component.html',
  styleUrls: ['./associate-managers.component.css']
})
export class AssociateManagersComponent implements OnInit {

	managerTable: FormGroup;
	memberTable: FormGroup;

  	constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,
private formBuilder: FormBuilder) {this.__componentInspectorService.getComp(this);
 }
	  	
  	ngOnInit(): void {
  	    this.managerTable = this.formBuilder.group({
  	      tableRows: this.formBuilder.array([])
  	    });
  	    
  	  	this.memberTable = this.formBuilder.group({
  	      tableRows: this.formBuilder.array([])
  	    });
  	  
  	    this.addRow(this.managerTable);
  	  	this.addRow(this.memberTable);
	}

	addMemberRow() {
		const control =  this.managerTable.get('tableRows') as FormArray;		
    	control.push(this.formBuilder.group({
    		FullName: ['',Validators.required],
    		Position: ['',Validators.required],
    		PhoneNo: ['',Validators.required],
    		email: [''],        
            isEditable: [true]
        }));
  	}

	addManagerRow() {
		const control =  this.managerTable.get('tableRows') as FormArray;		
    	control.push(this.formBuilder.group({
    		FullName: ['',Validators.required],
    		Position: ['',Validators.required],
    		PhoneNo: ['',Validators.required],
    		email: [''],        
            isEditable: [true]
        }));
  	}

	deleteRow(table: any, index: number) {
    	const control =  table.get('tableRows') as FormArray;
    	control.removeAt(index);
  	}
  	
  	get mgc() {
  	    const control = this.managerTable.get('tableRows') as FormArray;
  	    return control;
	}
  	
  	get mmc() {
  	    const control = this.memberTable.get('tableRows') as FormArray;
  	    return control;
	}

}
