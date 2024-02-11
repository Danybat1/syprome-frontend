import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { Utils } from "../utilities/utils";


@Injectable()
export class CategorieService {
    private apiUrl: string = Utils.apiURL+'/api/v1/basedeco/categorie';
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private httpClient: HttpClient) { }
  
    list(): Observable<any> {
      
      return this.httpClient.get(this.apiUrl).pipe(
          catchError(error => {
              console.log(error)
              return error.message;
          })
      );
    }
     
    getItem(id: any): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(
          catchError(error => {
              console.log(error)
              return error.message;
          })
      );
    }
  
    create(data: any): Observable<any> {
      const headers =this.headers;
       console.log("create sumit");
      return this.httpClient.post(this.apiUrl,JSON.stringify(data),{headers}).pipe(
          catchError(error => {
              console.log(error)
              return error.message;
          })
      );
    }
  
    // Edit/ Update 
    update(data: any): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}`, data).pipe(
          catchError(error => {
              console.log(error)
              return error.message;
          })
      );
    }
  
    // Delete
    delete(id: any): Observable<any> {
      
      return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
          catchError(error => {
              console.log(error)
              return error.message;
          })
      );
    }
   
}