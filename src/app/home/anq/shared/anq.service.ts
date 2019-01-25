import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnqService {

  constructor(private http: HttpClient) {}

  //-Tạo câu hỏi
  public createAnq(anqData: any): Observable<any> {
    return this.http.post('/api/anq', anqData);
  }

  //-Lấy listAnqs khi có đăng nhập
  public getAnqsAuth(): Observable<any> {
    return this.http.get('/api/anq/auth');
  }

  //-Lấy toàn bộ câu hỏi
  public getAnqs(): Observable<any> {
    return this.http.get('/api/anq');
  }

  //-Xoá câu hỏi
  public deleteAnq(anqId: string): Observable<any> {
    return this.http.delete(`/api/anq/${anqId}`);
  }

  //-Tạo messenger cho câu hỏi
  public createAnqMessenger(anqMes: any): Observable<any> {
    return this.http.post('/api/anq/mess/', anqMes);
  }
}
