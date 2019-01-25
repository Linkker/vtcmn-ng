import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';
import { Info } from '../shared/info.model';
import { AuthServices } from '../../../auth/shared/auth.service';

@Component({
  selector: 'vtc-tab01',
  templateUrl: './tab01.component.html',
  styleUrls: ['./tab01.component.scss']
})
export class Tab01Component implements OnInit {
  p: Number;
  editorTab01: string = '';
  addTab01; editTab01; delTab01 = false;
  infos: Info[]=[];
  formData: any = Object;
  errors: any[] = [];
  constructor(private infoService: InfoService,
              public auth: AuthServices){ }

  ngOnInit() {
    const infoObservable = this.infoService.getInfo01();
    infoObservable.subscribe(
      (infos: Info[]) => {
        this.infos = infos;
      },
      (err) => {
      },
      () => {
      });
  }

  AddButtonTab01(){
    this.addTab01=true;
  }

  EditButtonTab01(infoContent){
    this.editorTab01=infoContent;
    this.editTab01=true;
  }

  DelButtonTab01(){
    this.delTab01=true;
  }

  Add(){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      content : this.editorTab01
    })
    this.infoService.createInfo01(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.addTab01=false;
  }

  Edit(infoId){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      _id : infoId,
      editcontent : this.editorTab01
    })
    this.infoService.editInfo(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.editTab01=false;
  }

  Del(infoId){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      _id : infoId
    })
    console.log(this.formData);
    this.infoService.deleteInfo(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.delTab01=false;
  }

  Cancel(){
    this.editorTab01='';
    this.addTab01=false;
    this.editTab01=false;
    this.delTab01=false;
  }
}
