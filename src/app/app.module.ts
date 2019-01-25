import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { MetadataModule } from './metadata/metadata.module';
import { RouterModule, Routes } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { getAuthServiceConfigs } from "./socialloginConfig";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { AuthModule } from './auth/auth.module';

const  routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'metadatas', redirectTo: '/metadatas', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    MetadataModule,
    AuthModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
    NgbModule.forRoot()
  ],
  providers: [
    {provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
