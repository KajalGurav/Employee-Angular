import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  Employee_Form: FormGroup|any;
  Employee_Form_Data: any;
  selectedItem: any = { id: '', name: '', position: '', salary: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetch_Employee_Data();
  }

  initializeForm(): void {
    this.Employee_Form = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  fetch_Employee_Data(): void {
    this.service.get_Employees().subscribe(
      (response) => {
        console.log(response);
        this.Employee_Form_Data = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleAddForm(): void {
    this.showAddForm = true;
    this.showEditForm = false;
    this.resetForm();
  }

  toggleEditForm(item: any): void {
    this.selectedItem = { ...item };
    this.showEditForm = true;
    this.showAddForm = false;

    this.Employee_Form.patchValue({
      name: item.name,
      position: item.position,
      salary: item.salary
    });
  }

  resetForm(): void {
    this.Employee_Form.reset();
    this.Employee_Form.markAsUntouched();
    this.Employee_Form.markAsPristine();
  }

  add_Employee(event: Event): void {
    event.preventDefault();
    if (this.Employee_Form.invalid) {
      this.Employee_Form.markAllAsTouched();
      return;
    }

    const formData = {
      name: this.Employee_Form.value.name,
      position: this.Employee_Form.value.position,
      salary: this.Employee_Form.value.salary
    };

    this.service.add_Employee(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetch_Employee_Data();
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  update_Employee(id: number, event: Event): void {
    event.preventDefault();
    if (this.Employee_Form.invalid) {
      this.Employee_Form.markAllAsTouched();
      return;
    }

    const formData = {
      name: this.Employee_Form.value.name,
      position: this.Employee_Form.value.position,
      salary: this.Employee_Form.value.salary
    };

    this.service.update_Employee(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetch_Employee_Data();
        this.showEditForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  delete_Employee(id: number): void {
    this.service.delete_Employee(id).subscribe(
      (response) => {
        console.log(response);
        this.fetch_Employee_Data();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
