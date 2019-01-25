import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MetadataService } from '../shared/metadata.service';
import { Metadata } from '../shared/metadata.model';

@Component({
  selector: 'vtc-metadata-update',
  templateUrl: './metadata-update.component.html',
  styleUrls: ['./metadata-update.component.scss']
})
export class MetadataUpdateComponent implements OnInit {
  metadataData: Metadata;
  errors: any[] = [];
  constructor(private metadataService: MetadataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
  		(params) => {
        this.getMetadata(params['metadataId']);
  		})
  }
  getMetadata(metadataId: string) {
    this.metadataService.getMetadataById(metadataId).subscribe(
      (metadata: Metadata) => {
        this.metadataData = metadata;
      },
      (err)=> {},
      ()=>{});
  }

  buttonOK(){
    this.metadataService.updateMetadata(this.metadataData).subscribe(
      () => {
        this.router.navigate(['metadatas'],{fragment:'meta'});
      },
      (err)=> {},
      ()=>{});
  }

  buttonBack(){
    this.router.navigate(['metadatas'],{fragment:'meta'});
  }
}
