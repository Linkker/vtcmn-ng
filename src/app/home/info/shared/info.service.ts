import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InfoService {

  constructor(private http: HttpClient) {}

  //TAB 01
  //-Lấy list khi có đăng nhập
  public getInfo01(): Observable<any> {
    return this.http.get('/api/info/01');
  }

  //-Thêm lịch sản xuất
  public createInfo01(infoData: any): Observable<any> {
    return this.http.post('/api/info/01', infoData);
  }

    //-Xoá thông báo chung
  public deleteInfo(infoData: any): Observable<any> {
    return this.http.post('/api/info/del/', infoData);
  }

  //-Sửa thông báo chung
  public editInfo(infoData: any): Observable<any> {
    return this.http.patch('/api/info/edit/', infoData);
  }

  //TAB 02
  //-Lấy list khi có đăng nhập
  public getInfo02(infoData: any): Observable<any> {
    return this.http.post('/api/info/02/list', infoData);
  }

  //-Thêm thông báo chung
  public createInfo02(infoData: any): Observable<any> {
    return this.http.post('/api/info/02', infoData);
  }

  //TAB 03
  //-Lấy list khi có đăng nhập
  public getInfo03(infoData: any): Observable<any> {
    return this.http.post('/api/info/03/list', infoData);
  }

  //-Thêm thông báo chung
  public createInfo03(infoData: any): Observable<any> {
    return this.http.post('/api/info/03', infoData);
  }

  //TAB 04
  //-Lấy list khi có đăng nhập
  public getInfo04(): Observable<any> {
    return this.http.get('/api/info/04');
  }

  //-Thêm thông báo chung
  public createInfo04(infoData: any): Observable<any> {
    return this.http.post('/api/info/04', infoData);
  }

}
