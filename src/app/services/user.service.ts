import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>('/users')
      .pipe(
        catchError(this.handleError<any>('UserService - > getAll', []))
      )
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>('/users/' + id)
      .pipe(
        catchError(this.handleError<any>('UserService - > getById', []))
      )
  }


  registerUser(data: any): Observable<any> {
    return this.http.post<any>('/users', data)
      .pipe(
        catchError(this.handleError<any>('UserService - > registerUser', []))
      )
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return throwError(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
