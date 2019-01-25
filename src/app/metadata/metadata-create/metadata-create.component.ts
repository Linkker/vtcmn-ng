import { Component, OnInit } from '@angular/core';
import { Metadata } from '../shared/metadata.model';
import { MetadataService } from '../shared/metadata.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'vtc-metadata-create',
  templateUrl: './metadata-create.component.html',
  styleUrls: ['./metadata-create.component.scss']
})
export class MetadataCreateComponent implements OnInit {
  private buttonClick: String;
  newMetadata: Metadata;
  errors: any[] = [];

  constructor(private metadataService: MetadataService,
              private router: Router) { }

  /* handleImageChange() {
    this.newMetadata.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg";
  } */

  ngOnInit() {
    this.newMetadata = new Metadata();
    this.buttonClick = "";
  }

  /* handleImageUpload(imageUrl: string) {
    this.newMetadata.image = imageUrl;
  }

  handleImageError() {
    this.newMetadata.image = '';
  } */

  cancelMetadata() {
    this.buttonClick="";
    this.newMetadata = new Metadata();
  }

  createMetadata() {
    this.buttonClick = "";
  }

  buttonOK(){
    this.metadataService.createMetadata(this.newMetadata).subscribe(
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
