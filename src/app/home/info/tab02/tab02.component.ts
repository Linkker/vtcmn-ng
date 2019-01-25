import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';
import { Info } from '../shared/info.model';
import { AuthServices } from '../../../auth/shared/auth.service';

@Component({
  selector: 'vtc-tab02',
  templateUrl: './tab02.component.html',
  styleUrls: ['./tab02.component.scss']
})
export class Tab02Component implements OnInit {
  p: Number;
  editorTab02: string = '';
  addTab02; editTab02; delTab02 = false;
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
      const infoObservable = this.infoService.getInfo02(this.formData);
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

  AddButtonTab02(){
    this.addTab02=true;
  }

  EditButtonTab02(infoContent){
    this.editorTab02=infoContent;
    this.editTab02=true;
  }

  DelButtonTab02(){
    this.delTab02=true;
  }

  Add(){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      content : this.editorTab02
    })
    this.infoService.createInfo02(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.addTab02=false;
  }

  Edit(infoId){
    this.formData={};
    this.formData = ({
      userId : this.auth.getId(),
      _id : infoId,
      editcontent : this.editorTab02
    })
    this.infoService.editInfo(this.formData).subscribe(
      () => {
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
    this.editTab02=false;
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
    this.delTab02=false;
  }

  Cancel(){
    this.editorTab02='';
    this.addTab02=false;
    this.editTab02=false;
    this.delTab02=false;
  }
}
