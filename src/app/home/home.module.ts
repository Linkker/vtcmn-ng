import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { AnqService } from './anq/shared/anq.service';
import { sanitizeHtmlPipe } from '../sanitize-html.pipe';
import { AuthGuard } from '../auth/shared/auth.guard';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChatService } from '../chat/shared/chat.service';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { InfoService } from '../home/info/shared/info.service';

import { HomeComponent } from './home.component';
import { ChatComponent } from './../chat/chat.component';
import { AnqComponent } from './anq/anq.component';
import { InfoComponent } from './info/info.component';
import { AnswerComponent } from './anq/answer/answer.component';
import { Tab01Component } from './info/tab01/tab01.component';
import { Tab02Component } from './info/tab02/tab02.component';
import { Tab03Component } from './info/tab03/tab03.component';
import { Tab04Component } from './info/tab04/tab04.component';

const routes: Routes = [
  {path: '',
    children: [
      {path: '', component: HomeComponent},
      {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]}
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CKEditorModule,
    NgxPaginationModule,
    NgxAutoScrollModule
  ],
  declarations: [
    sanitizeHtmlPipe,
    HomeComponent,
    ChatComponent,
    AnqComponent,
    InfoComponent,
    AnswerComponent,
    Tab01Component,
    Tab02Component,
    Tab03Component,
    Tab04Component
  ],
  exports: [
    sanitizeHtmlPipe,
    HomeComponent
  ],
  providers: [
    AnqService,
    ChatService,
    InfoService
  ]
})
export class HomeModule {}

