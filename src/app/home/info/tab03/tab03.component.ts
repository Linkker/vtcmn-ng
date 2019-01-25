import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';
import { Info } from '../shared/info.model';
import { AuthServices } from '../../../auth/shared/auth.service';

@Component({
  selector: 'vtc-tab03',
  templateUrl: './tab03.component.html',
  styleUrls: ['./tab03.component.scss']
})
export class Tab03Component implements OnInit {
  p: Number;
  editorTab03: string = '';
  addTab03; editTab03; delTab03 = false;
  infos: Info[]=[];
  formData: any = Object;
  errors: any[] = [];
  constructor(private infoService: InfoService,
              public auth: AuthServices) { }

  ngOnInit() {
    if(this.auth.isTrungtam()){
      this.formData = ({
        userId : this.auth.getId()
      })
      const infoObservable = this.infoService.getInfo03(this.formData);
        infoObservable.subscribe(
          (infos: Info[]) => {
            this.infos = infos;
          },
          (err) => {
          },
          () => {
          });
    }
  }

  AddButtonTab03(){
    this.addTab03=true;
  }

  EditButtonTab03(infoContent){
    this.editorTab03=infoContent;
    this.editTab03=true;
  }

  DelButtonTab03(){
    this.delTab03=true;
  }

  Add(){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      content : this.editorTab03
    })
    this.infoService.createInfo03(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.addTab03=false;
  }

  Edit(infoId){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      _id : infoId,
      editcontent : this.editorTab03
    })
    this.infoService.editInfo(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.editTab03=false;
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
    this.delTab03=false;
  }

  Cancel(){
    this.editorTab03='';
    this.addTab03=false;
    this.editTab03=false;
    this.delTab03=false;
  }
}
