import { TokenInterceptor } from './../shared/token.interceptor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angular-6-social-login';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'vtc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';
  buttonClicked:string='';

  constructor(private fb: FormBuilder,
              private auth: AuthServices,
              private router: Router,
              private route: ActivatedRoute,
              private socialAuthService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.notifyMessage = 'You have been succesfuly registered, you can login now!';
      }
    })
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
                   Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isInvalidForm(fieldName): boolean {
    if(this.loginForm)
    return this.loginForm.controls[fieldName].invalid &&
           (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  public socialSignIn(socialPlatform ='google') {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data Token : " , userData.token);
        this.auth.authgoogle({access_token: userData.token }).subscribe(
          (token) => {
            this.router.navigate(['/']);
          },
            (errorResponse) => {
              this.errors = errorResponse.error.errors;
            })
      }
    );
  }

  login() {
    if(this.buttonClicked=='signin'){
      this.auth.login(this.loginForm.value).subscribe(
        (token) => {
          this.router.navigate(['/']);
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
        })
    }
    if(this.buttonClicked=='signingoogle'){
      this.socialSignIn();
    }
  }
}
