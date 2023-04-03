import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

interface Country {
  id?: number,
	name: string;
	flag: string;
	department: string;
	days: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Ram',
		flag: 'f/f3/Flag_of_Russia.svg',
		department: 'labour',
		days: 30,
	},
	{
		name: 'Tim',
		flag: 'f/f3/Flag_of_Russia.svg',
		department: 'labour',
		days: 30,
	},
	{
		name: 'Jack',
		flag: 'f/f3/Flag_of_Russia.svg',
		department: 'labour',
		days: 30,
	},
	{
		name: 'Lamo',
		flag: 'f/f3/Flag_of_Russia.svg',
		department: 'labour',
		days: 30,
	},
	{
		name: 'Quid',
		flag: 'f/f3/Flag_of_Russia.svg',
		department: 'labour',
		days: 30,
	},
];

function search(text: string, pipe: PipeTransform): Country[] {
	return COUNTRIES.filter((country) => {
		const term = text.toLowerCase();
		return (
			country.name.toLowerCase().includes(term) ||
			pipe.transform(country.department).includes(term) ||
			pipe.transform(country.days).includes(term)
		);
	});
}

@Component({
	selector: 'app-employee-tab',
	standalone: true,
	imports: [DecimalPipe, NgFor, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule,NgbPaginationModule,FormsModule],
	templateUrl: './employee-tab.component.html',
	providers: [DecimalPipe],
})
export class EmployeeTabComponent {
	countries$: Observable<Country[]>;
	filter = new FormControl('', { nonNullable: true });
  page = 1;
	pageSize = 4;
	collectionSize = COUNTRIES.length;
	constructor(pipe: DecimalPipe) {
		this.countries$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => search(text, pipe)),
		);
    //this.refreshCountries();
	}

  refreshCountries() {
		this.countries$ = of(COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		))
	}
}