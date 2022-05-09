import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  private REST_API_SERVER = 'https://626ba54a6a86cd64adbf740c.mockapi.io';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getComment(): Observable<any> {
    const url = `${this.REST_API_SERVER}/KhoaPhongList`
    return  this.httpClient
    .get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public postComment(data:any) {
    const url = `${this.REST_API_SERVER}/KhoaPhongList`
    return  this.httpClient
    .post<any>(url,data, this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public deleteComment(id:number) {
    const url = `${this.REST_API_SERVER}/KhoaPhongList`
    return  this.httpClient
    .delete<any>(`${url}/${id}`,this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public editComment(id:number, data: any) {
    const url = `${this.REST_API_SERVER}/KhoaPhongList`
    return  this.httpClient
    .put<any>(`${url}/${id}`,data,this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}