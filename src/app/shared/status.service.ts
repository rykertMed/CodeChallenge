import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MbiObj} from '../Mbi';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getMBI(): Promise<void | any> {
    return this.http.get(this.baseUrl + '/generate')
               .toPromise()
               .then((response: any) => { 
                 console.log('result ->', response);
                 return response;
              })
               .catch(this.error);
  }

  postMBI(mbiObj: MbiObj): Promise<void | any> {
    return this.http.post(this.baseUrl + '/verify', { mbiObj })
               .toPromise()
               .then((response: any) => { 
                 console.log('result ->', response);
                 return response;
              })
               .catch(this.error);
  }

  // Error handling
  private error (error: any) {
    let message = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}