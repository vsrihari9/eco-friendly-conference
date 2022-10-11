import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get('http://localhost:3000/cities');
  }

  calculate(obj: any) {
    return this.http.post('http://localhost:3000/bestsite',
    {
      item:obj
    });
  }

  getFilteredCities(input: string) {
    return this.http.get('http://localhost:3000/cities?q=' + input);
  }
}
