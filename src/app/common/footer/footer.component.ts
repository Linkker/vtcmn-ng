import { Component, OnInit } from '@angular/core';
import { AuthServices } from './../../auth/shared/auth.service';

@Component({
  selector: 'vtc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public auth: AuthServices) { }

  ngOnInit() {
  }

}
