import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentListService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://xicoc4bsz7wiwdlycp6gfkp35i0dawzd.lambda-url.eu-north-1.on.aws/api/EquipmentControl';
  // Define a method to fetch equipment list
  getEquipmentList(): Observable<any> {
    const url = this.apiUrl;
    return this.http.get(url);
  }

  sendEmailNotification(email: string, subject: string, body: string): Observable<any> {
    const url = this.apiUrl + '/Notify';
    const emailRequest = { ToEmail: email, Subject: subject, Body: body };

    return this.http.post(url, emailRequest);
  }

  addEquipment(equipment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, equipment);
  }
  
}
