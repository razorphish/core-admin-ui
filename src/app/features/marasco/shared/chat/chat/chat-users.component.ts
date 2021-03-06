import {Component, OnInit, Input} from '@angular/core';
import {ChatService} from "@app/features/marasco/core/services/chat.service";

@Component({
  selector: 'chat-users',
  templateUrl: './chat-users.component.html',
})
export class ChatUsersComponent implements OnInit {

  @Input() users: Array<any>;

  public filter: string = '';

  public isOpen = false;

  public openToggle(){
    this.isOpen = !this.isOpen
  }

  constructor(private chatService: ChatService) { }


  messageTo(user){
    this.chatService.messageTo(user)

  }

  ngOnInit() {
  }

}
