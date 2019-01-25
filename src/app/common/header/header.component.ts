import { AuthServices } from './../../auth/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vtc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthServices,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {}

  logout() {
    this.auth.logout();
    location.reload();
    this.router.navigate(['/login'],{fragment:'dangnhap'});
  }
}
