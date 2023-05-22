import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchTerm: string = '';
  page = 1;
  pageSize = 4;
  collectionSize: number = 100;
  currentRate = 8;
  countries: Country[] = [];
  allCountries: Country[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Country[]>('./assets/data/countries.json')
      .subscribe((data: Country[]) => {
        debugger
        this.collectionSize = data.length;
        this.countries = data;
        this.allCountries = this.countries;
      });
  }

  search(event: any): void {
    const searchFilter = event.target?.value;
    this.countries = this.allCountries.filter((val) =>
      val.name.toLowerCase().includes(searchFilter)
    );
    this.collectionSize = this.countries.length;
  }
}
