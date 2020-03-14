import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  apiURL = '/assets/stores.json';

  constructor(private http: HttpClient) { }

  public getResult() {

      return this.http.get(this.apiURL);
}
}
