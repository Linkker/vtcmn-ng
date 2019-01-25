import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vtc-metadata-list-item',
  templateUrl: './metadata-list-item.component.html',
  styleUrls: ['./metadata-list-item.component.scss']
})
export class MetadataListItemComponent implements OnInit {
  @Input() metadata: any;

  constructor() { }

  ngOnInit() {
  }

}
