import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MetadataService } from '../shared/metadata.service';
import { Metadata } from '../shared/metadata.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'vtc-metadata-new',
  templateUrl: './metadata-new.component.html',
  styleUrls: ['./metadata-new.component.scss']
})
export class MetadataNewComponent implements OnInit {
  copyMetadata: Metadata;
  errors: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private metadataService: MetadataService,) { }

  ngOnInit() {
    this.route.params.subscribe(
  		(params) => {
        this.getMetadata(params['metadataId']);
  		})
  }
  getMetadata(metadataId: string) {
    this.metadataService.getMetadataById(metadataId).subscribe(
      (metadata: Metadata) => {
        this.copyMetadata = metadata;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      });
  }

  buttonOK(){
    this.metadataService.createMetadata(this.copyMetadata).subscribe(
      () => {
        this.router.navigate(['metadatas'],{fragment:'meta'});
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      })
  }

  buttonBack(){
    this.router.navigate(['metadatas'],{fragment:'meta'});
  }
}
