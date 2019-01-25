export class Anq {

	static readonly DATE_FORMAT = 'DD/MM/YY';

	_id: string;
	feedbackName: string;
  feedbackTitle: string;
  feedbackMessenger: string;
  feedbackCreateAt: string;
  Answers:[{
    AnsMessenger:string,
    AnsEmail:string,
    AnsCreateAt:string,
  }];
}
