import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Task } from '../_models/task.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/tasks'; // Base URL for the Client API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }

  // Create a new task
  createTask(Task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl+'/create', Task, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('createClient'))
      );
  }

  // Get all Clients
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError<Task[]>('getAllTasks', []))
      );
  }

  // Search for a Client by ID
  searchTask(id: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/findOne`, { id }, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('findOne'))
      );
  }

  // Update an existing Client
  updateTask(client: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}`, client, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('updateClient'))
      );
  }

  // Delete a Task by ID
  deleteTask(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteTask', false))
      );
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }

  // 
  


}
