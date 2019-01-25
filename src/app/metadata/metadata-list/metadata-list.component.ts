import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../shared/metadata.service';
import { Metadata } from '../shared/metadata.model';

@Component({
  selector: 'vtc-metadata-list',
  templateUrl: './metadata-list.component.html',
  styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent implements OnInit {
  p: Number;
  metadatas: Metadata[] = [];

  constructor(private metadataService: MetadataService) { }

  ngOnInit() {
    const metadataObservable = this.metadataService.getMetadatas();

    metadataObservable.subscribe(
    	(metadatas: Metadata[]) => {
    		this.metadatas = metadatas;
    	},
    	(err) => { },
    	() => { });
  }
}
