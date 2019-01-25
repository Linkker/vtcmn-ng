import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from './metadata.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MetadataService {

  constructor(private http: HttpClient) {}

  public getMetadataById(metadataId: string): Observable<any> {
    return this.http.get('/api/metadata/'+metadataId);
  }

  public getMetadatas(): Observable<any> {
    return this.http.get('/api/metadata');
  }

  public createMetadata(metadata: Metadata): Observable<any> {
    return this.http.post('/api/metadata', metadata);
  }

  public deleteMetadata(metadataId: string): Observable<any> {
    return this.http.delete(`/api/metadata/${metadataId}`);
  }

  public updateMetadata(metadataData: any): Observable<any> {
    return this.http.patch('/api/metadata/update', metadataData);
  }

}
