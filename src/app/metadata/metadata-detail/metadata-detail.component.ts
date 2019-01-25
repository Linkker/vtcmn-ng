import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from '../shared/metadata.service';
import { Metadata } from '../shared/metadata.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServices } from './../../auth/shared/auth.service';

@Component({
  selector: 'vtc-metadata-detail',
  templateUrl: './metadata-detail.component.html',
  styleUrls: ['./metadata-detail.component.scss']
})
export class MetadataDetailComponent implements OnInit {
  p: Number;
  metadata: Metadata;
  errors: any[] = [];
  closeResult: string;
  modalRef: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public auth: AuthServices,
              private metadataService: MetadataService,
              config: NgbModalConfig, private modalService: NgbModal) {
                // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.route.params.subscribe(
  		(params) => {
        this.getMetadata(params['metadataId']);
  		})
  }
  getMetadata(metadataId: string) {
    this.metadataService.getMetadataById(metadataId).subscribe(
      (metadata: Metadata) => {
        this.metadata = metadata;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      });
  }

  buttonDel(content){
    this.errors = [];
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  buttonEdit(){
    this.router.navigate([`metadatas/update/${this.metadata._id}`]);
  }

  buttonAdd(){
    this.router.navigate([`metadatas/new/${this.metadata._id}`]);
  }

  DelMetadata(){
    const metadataObservable = this.metadataService.deleteMetadata(this.metadata._id);
    metadataObservable.subscribe(
    	() => {
    		this.router.navigate(['metadatas'],{fragment:'meta'});
    	},
    	(errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      });
      this.modalRef.close();
  }

  buttonBack(){
    this.router.navigate(['metadatas'],{fragment:'meta'});
  }
}
