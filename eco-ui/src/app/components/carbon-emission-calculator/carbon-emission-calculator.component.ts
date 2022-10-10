import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-carbon-emission-calculator',
  templateUrl: './carbon-emission-calculator.component.html',
  styleUrls: ['./carbon-emission-calculator.component.css']
})
export class CarbonEmissionCalculatorComponent implements OnInit {

  ecoForm: FormGroup = new FormGroup({});

  cabinClasses = [
     {label: "Economy", value: "economy"},
     {label: "Premium", value: "premium"}
  ];

  cities: any;
  minDate: Date;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder, private service: AppService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date();
    console.log(this.minDate.toDateString());
    this.maxDate = new Date(currentYear + 1, currentMonth, currentDate);
  }

  ngOnInit(): void {
    this.service.getLocations().subscribe((res: any) => {
      console.log('res is..... :::: ', res.locations);
      this.cities = res.locations;
    })
    this.createForm();
  }

  createForm() {
    this.ecoForm = this.formBuilder.group({
      'travelClass': [null, Validators.required],
      'travellers': [null, Validators.required],
      'sites': [null, Validators.required],
      'travelDateRange': this.formBuilder.group({
        startDate: [null, Validators.required],
        endDate: [null, Validators.required]
      })
    });
  }

  onSubmit() {
    if(this.ecoForm.valid) {
      const obj = this.ecoForm.value;
      console.log('obj val is... @@@ ::: ', obj);
      this.service.calculate();
    } else {
      this.validateAllFormFields(this.ecoForm);
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if(control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
