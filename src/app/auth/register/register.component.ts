import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vtc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];

  constructor(private auth: AuthServices,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  register() {
      this.auth.register(this.formData).subscribe(
      () => {
        this.router.navigate(['login',{registered:'success'}],{fragment:'dangnhap'});
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
  }
}
