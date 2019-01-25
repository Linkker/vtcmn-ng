import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
//import { MapModule } from '../common/map/map.module';
//import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
//import { EditableModule } from '../common/components/editable/editable.module';
//import { ImageUploadModule } from '../common/components/image-upload/image-upload.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { MetadataService } from './shared/metadata.service';
//import { BookingService } from '../booking/shared/booking.service';
//import { HelperService } from '../common/service/helper.service';
//import { UppercasePipe } from '../common/pipes/uppercase.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';
//import { MetadataGuard } from './shared/metadata.guard';
//import { MetadataUpdateComponent } from './metadata-update/metadata-update.component';
import { MetadataComponent } from './metadata.component';
import { MetadataCreateComponent } from './metadata-create/metadata-create.component';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { MetadataSearchComponent } from './metadata-search/metadata-search.component';
import { MetadataListItemComponent } from './metadata-list-item/metadata-list-item.component';
import { MetadataDetailComponent } from './metadata-detail/metadata-detail.component';
import { MetadataUpdateComponent } from './metadata-update/metadata-update.component';
import { MetadataNewComponent } from './metadata-new/metadata-new.component';
//import { MetadataDetailBookingComponent } from './metadata-detail/metadata-detail-booking/metadata-detail-booking.component';

const routes: Routes = [
  { path: 'metadatas',
    component: MetadataComponent,
    children: [
      { path: '', component: MetadataListComponent },
      { path: 'search', component: MetadataSearchComponent},
      { path: 'create', component: MetadataCreateComponent, canActivate: [AuthGuard]},
      { path: ':metadataId', component: MetadataDetailComponent},
      { path: 'update/:metadataId', component: MetadataUpdateComponent, canActivate: [AuthGuard]},
      { path: 'new/:metadataId', component: MetadataNewComponent, canActivate: [AuthGuard]},
      //{ path: ':metadataId/edit', component: MetadataUpdateComponent, canActivate: [AuthGuard, MetadataGuard] },
      //{ path: ':metadataId', component: MetadataDetailComponent},
    ]
  }
]

@NgModule({
  declarations: [
    MetadataListComponent,
    MetadataListItemComponent,
    MetadataComponent,
    //MetadataDetailComponent,
    //UppercasePipe,
    //MetadataDetailBookingComponent,
    MetadataCreateComponent,
    MetadataListComponent,
    MetadataSearchComponent,
    MetadataListItemComponent,
    MetadataDetailComponent,
    MetadataUpdateComponent,
    MetadataNewComponent
    //MetadataUpdateComponent
  ],
  imports: [
  	CommonModule,
  	RouterModule.forChild(routes),
    HttpClientModule,
    //NgPipesModule,
    //MapModule,
    //Daterangepicker,
    FormsModule,
    NgxPaginationModule
    //EditableModule,
    //ImageUploadModule
  ],
  providers: [
    MetadataService,
    //HelperService,
    //BookingService,
    //UcWordsPipe,
    //MetadataGuard
  ]
})
export class MetadataModule {}
