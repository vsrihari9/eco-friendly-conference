import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-carbon-emission-calculator',
  templateUrl: './carbon-emission-calculator.component.html',
  styleUrls: ['./carbon-emission-calculator.component.css']
})
export class CarbonEmissionCalculatorComponent implements OnInit {

  ecoForm: UntypedFormGroup = new UntypedFormGroup({});

  cabinClasses = [
     {label: "Economy", value: "economy"},
     {label: "Premium", value: "premium"}
  ];

  cities: any;
  results: any;
  cols: any;
  minDate: Date;
  maxDate: Date;

  constructor(private formBuilder: UntypedFormBuilder, private service: AppService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date();
    console.log(this.minDate.toDateString());
    this.maxDate = new Date(currentYear + 1, currentMonth, currentDate);
  }

  ngOnInit(): void {
    this.service.getLocations().subscribe((res: any) => {
      console.log('res is..... :::: ', res.results);
      this.cities = res.results;
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
      this.service.calculate(obj).subscribe((res: any) => {
        console.log('res is..... :::: ', res.results);
        this.results = res.results;
        this.cols = [];
        if (this.results && this.results.length > 0) {
          for (const col in this.results[0]) {
            this.cols.push({
              field: col,
              header: col,
            });
          }
        }
      });
    } else {
      this.validateAllFormFields(this.ecoForm);
    }
  }

  private validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
      } else if(control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
