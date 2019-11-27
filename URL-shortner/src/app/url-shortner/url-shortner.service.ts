import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UrlShortnerService {
  
  urlSubject = new Subject<any>();
  constructor(private _http: HttpClient) { }

  getShortenedUrl(url:string) {
    this._http.post("http://localhost:3001/api/shorten", {longUrl: url})
        .subscribe(url => {
          debugger;
          this.urlSubject.next(url)
        });
  }

}
