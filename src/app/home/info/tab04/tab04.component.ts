import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';
import { Info } from '../shared/info.model';
import { AuthServices } from '../../../auth/shared/auth.service';

@Component({
  selector: 'vtc-tab04',
  templateUrl: './tab04.component.html',
  styleUrls: ['./tab04.component.scss']
})
export class Tab04Component implements OnInit {
  p: Number;
  editorTab04: string = '';
  addTab04; editTab04; delTab04 = false;
  infos: Info[]=[];
  formData: any = Object;
  errors: any[] = [];
  constructor(private infoService: InfoService,
              public auth: AuthServices) { }

  ngOnInit() {
    const infoObservable = this.infoService.getInfo04();
    infoObservable.subscribe(
      (infos: Info[]) => {
        this.infos = infos;
      },
      (err) => {
      },
      () => {
      });
  }

  AddButtonTab04(){
    this.addTab04=true;
  }

  EditButtonTab04(infoContent){
    this.editorTab04=infoContent;
    this.editTab04=true;
  }

  DelButtonTab04(){
    this.delTab04=true;
  }

  Add(){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      content : this.editorTab04
    })
    this.infoService.createInfo04(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.addTab04=false;
  }

  Edit(infoId){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      _id : infoId,
      editcontent : this.editorTab04
    })
    this.infoService.editInfo(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.editTab04=false;
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
    this.delTab04=false;
  }

  Cancel(){
    this.editorTab04='';
    this.addTab04=false;
    this.editTab04=false;
    this.delTab04=false;
  }
}
