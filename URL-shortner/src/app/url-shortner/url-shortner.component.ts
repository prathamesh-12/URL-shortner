import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { UrlShortnerService } from './url-shortner.service';

@Component({
  selector: 'app-url-shortner',
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.css']
})
export class UrlShortnerComponent implements OnInit {

  shortenURL: string = "";
  constructor( private _urlShortService: UrlShortnerService ) { }

  ngOnInit() {
    this._urlShortService.urlSubject
      .subscribe(url => {
        this.shortenURL = url && url.shortUrl;
      });
  }

  onUSFormSubmit(form) {
    const longURL = form.value.longURL;
    this._urlShortService.getShortenedUrl(longURL);
  }

  onCopyToClipboard(element) {
    element.select();
    document.execCommand('copy');
    element.setSelectionRange(0, 0);
  }

}
