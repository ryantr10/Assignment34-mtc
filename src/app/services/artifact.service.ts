import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artifact {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private apiUrl = 'http://localhost:3000/artifacts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>(this.apiUrl);
  }

  getById(id: string): Observable<Artifact> {
    return this.http.get<Artifact>(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: Artifact): Observable<Artifact> {
    return this.http.put<Artifact>(`${this.apiUrl}/${id}`, data);
  }
}
