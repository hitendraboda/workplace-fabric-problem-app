import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>('/floor')
      .pipe(
        catchError(this.handleError<any>('FloorService - > getAll', []))
      )
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>('/floor/' + id)
      .pipe(
        catchError(this.handleError<any>('FloorService - > getById', []))
      )
  }

  bookChair(data: any): Observable<any> {
    return this.http.post<any>('/floor/book', data)
      .pipe(
        catchError(this.handleError<any>('FloorService - > bookChair', []))
      )
  }

  addFloor(data: any): Observable<any> {
    return this.http.post<any>('/floor', data)
      .pipe(
        catchError(this.handleError<any>('FloorService - > addFloor', []))
      )
  }

  deleteFloor(id: string): Observable<any> {
    return this.http.delete<any>('/floor/' + id)
      .pipe(
        catchError(this.handleError<any>('FloorService - > delete', []))
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
