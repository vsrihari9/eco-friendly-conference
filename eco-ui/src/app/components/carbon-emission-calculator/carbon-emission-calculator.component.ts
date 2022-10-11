import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatSort, Sort} from '@angular/material/sort';
import {AppService} from "../../services/app.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";
import {MatTableExporterDirective} from "mat-table-exporter";

export interface EffectiveCostElement {
  dest_city_id: number;
  city: string;
  state: string;
  code: number;
  airfare: number;
  co2: number;
  perdiem: number;
  monetaryCost: number;
  effectiveCost: number;
}

let ELEMENT_DATA: EffectiveCostElement[] = [];

@Component({
  selector: 'app-carbon-emission-calculator',
  templateUrl: './carbon-emission-calculator.component.html',
  styleUrls: ['./carbon-emission-calculator.component.css']
})
export class CarbonEmissionCalculatorComponent implements OnInit, AfterViewInit {

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

  displayedColumns: string[] = ['dest_city_id', 'city', 'state', 'code', 'airfare', 'co2', 'perdiem', 'monetaryCost', 'effectiveCost'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild("exporter") exporter! : MatTableExporterDirective;

  constructor(private formBuilder: UntypedFormBuilder, private service: AppService, private _liveAnnouncer: LiveAnnouncer) {
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

  ngAfterViewInit() {
    if(this.dataSource) {
      this.dataSource.sort = this.sort;
    }
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
          this.dataSource.data = this.results;
          console.log('this.dataSource val is.... ', this.dataSource);
          console.log('this.dataSource val is.... ', this.dataSource.data?.length);
          for (const col in this.results[0]) {
            this.cols.push({
              field: col,
              header: col,
            });
          }
        }
        console.log('res is..... @@@@ ', this.cols);

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

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
