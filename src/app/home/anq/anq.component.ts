import { Component, OnInit } from '@angular/core';
import { AnqService } from './shared/anq.service';
import { Anq } from './shared/anq.model';
import { AuthServices } from '../../auth/shared/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'vtc-anq',
  templateUrl: './anq.component.html',
  styleUrls: ['./anq.component.scss'],
})
export class AnqComponent implements OnInit {
  p: Number;
  anqs: Anq[] = [];
  errors: any[] = [];
  buttonChoice = undefined;
  AnsMessenger = '';

  formData: Anq = new Anq;
  AnswerAndQuestion = '';
  closeResult: string;
  modalRef: any;

  constructor(private anqService: AnqService,
              private auth: AuthServices,
              config: NgbModalConfig, private modalService: NgbModal) {
                // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()){
      const anqObservable = this.anqService.getAnqsAuth();
      anqObservable.subscribe(
        (anqs: Anq[]) => {
          this.anqs = anqs;
        },
        (err) => {
        },
        () => {
        });
        console.log(this.anqs);
    } else {
      const anqObservable = this.anqService.getAnqs();
      anqObservable.subscribe(
        (anqs: Anq[]) => {
          this.anqs = anqs;
        },
        (err) => {
        },
        () => {
        });
        //console.log(this.anqs);
    }
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  AnqClick(){
    console.log(this.formData);
    this.anqService.createAnq(this.formData).subscribe(
      () => {
        console.log('vào server node');
        this.modalRef.close();
        this.formData = new Anq;
        this.errors = [];
        this.ngOnInit();
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
  }

  del(anqId){
    console.log(anqId);
    this.anqService.deleteAnq(anqId).subscribe(
      () => {
        console.log('xoá trong server');
        this.anqs.splice(this.buttonChoice, 1);
        this.buttonChoice = undefined;
    },
    (errorResponse) => {
      this.errors = errorResponse.error.errors;
    })
  }

  ansMessenger(id, mes){
    console.log(id, mes);
    const anqMes = ({
      anqId : id,
      messenger : mes,
      messengerEmail : this.auth.getEmail()
    });
    console.log(anqMes);
    this.anqService.createAnqMessenger(anqMes).subscribe(
      () => {
        this.buttonChoice = undefined;
        this.AnsMessenger = '';
        this.ngOnInit();
    },
    (errorResponse) => {
      this.errors = errorResponse.error.errors;
    })
  }

}
