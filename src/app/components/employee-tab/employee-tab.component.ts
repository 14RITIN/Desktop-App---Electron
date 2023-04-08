import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

interface Employee {
	id?: number,
	name: string,
	hours: {}
}
const EMPLOYEE: Employee[] = [
	{
		id: 1,
		name: 'Ram',
		hours: {}
	},
	{
		name: 'krishna',
		hours: {}
	},
	{
		name: 'Vishu',
		hours: {}
	},
	{
		name: 'Shiva',
		hours: {}
	},
	{
		name: 'Laxman',
		hours: {}
	},
	{
		name: 'Sita',
		hours: {}
	},
];
function search(text: string, pipe: PipeTransform): Employee[] {
	return EMPLOYEE.filter((employee) => {
		const term = text.toLowerCase();
		return (
			employee.name.toLowerCase().includes(term) ||
			pipe.transform(employee.hours).includes(term)
		);
	});
}

@Component({
	selector: 'app-employee-tab',
	standalone: true,
	imports: [DecimalPipe, NgFor, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule, NgbPaginationModule, FormsModule],
	templateUrl: './employee-tab.component.html',
	providers: [DecimalPipe],
})
export class EmployeeTabComponent {
	// countries$: Observable<Country[]>;
	employee$: Observable<Employee[]>;
	filter = new FormControl('', { nonNullable: true });
	page = 1;
	pageSize = 4;
	collectionSize = EMPLOYEE.length;
	dateArray:Date[] = [];
	currentDate:Date= new Date();
 Months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
 Days = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat'];


	constructor(pipe: DecimalPipe) {
		this.employee$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => search(text, pipe)),
		);
		this.buildDateArray();
		//this.refreshCountries();
	}

	buildDateArray(){
		this.dateArray=[];
		for(let i=1;i< this.getDaysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1); i++){
			var date =  new Date( this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
			this.dateArray.push(date);
		}

	}

	getDaysInMonth(month:number, year:number){
		return  new Date(year, month, 0).getDate();
	}

	refreshCountries() {
		this.employee$ = of(EMPLOYEE.map((employee, i) => ({ id: i + 1, ...employee })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		))
	}
}