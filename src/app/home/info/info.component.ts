import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vtc-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  Tab = 1;
  constructor() { }

  ngOnInit() {
  }
}
