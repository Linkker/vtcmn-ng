import { Component, OnInit} from '@angular/core';
import { ChatService } from './shared/chat.service';
import { AuthServices } from '../auth/shared/auth.service';

@Component({
  selector: 'vtc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  buttonJoin: boolean = false;
  user: String;
  room: String;
  private listUser: Array<{room:String,user:String}> = [];
  private messageText: String;
  private messageArray:Array<{user:String,message:String}> = [];
  selectDefault;
  phong = [
    {value: 'trungtam', label : 'Trung tâm VTC Miền Nam'},
    {value: 'noidung', label : 'Phòng Quản trị Nội dung'},
    {value: 'tonghop', label : 'Phòng Quản trị Tổng hợp'},
    {value: 'thehien', label : 'Phòng Thể hiện'},
    {value: 'hkcn', label : 'Phòng Hậu kì - Công nghệ'}
  ]
  constructor(private auth: AuthServices,
              private _chatService:ChatService){
      if(auth.isAuthenticated()){this.user = auth.getEmail()}
      else{this.user="vô danh"};

      this._chatService.newUserJoined()
      .subscribe(data=> this.messageArray.push(data));

      this._chatService.userLeftRoom()
      .subscribe(data=>this.messageArray.push(data));

      this._chatService.newMessageReceived()
      .subscribe(data=>this.messageArray.push(data));

      this._chatService.getList()
      .subscribe(data=>{
        //this.listUser=[];
        this.listUser=data;
        console.log(this.listUser);
      });
    }

  ngOnInit() {
    this.room = 'trungtam';
  }

  join(){
      this.buttonJoin=true;
      this._chatService.joinRoom({user:this.user, room:this.room});
      console.log(this.listUser);
    }

  leave(){
      this.buttonJoin=false;
      this._chatService.leaveRoom({user:this.user, room:this.room});
      console.log(this.listUser);
    }

  sendMessage(){
      this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
      this.messageText='';
  }
}
