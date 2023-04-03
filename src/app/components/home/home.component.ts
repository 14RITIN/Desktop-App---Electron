import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTabComponent } from '../employee-tab/employee-tab.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports:[NgbNavModule,EmployeeTabComponent]
})
export class HomeComponent {

}
