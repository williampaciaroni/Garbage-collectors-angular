import { Injectable } from '@angular/core';
     
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  private errorStatus: string = '';
 
  add(message: string) {
    this.messages.push(message);
  }
 
  clear() {
    this.messages = [];
  }

  setError(status: string){
    this.errorStatus=status;
  }

  getErrorStatus(): string{
    return this.errorStatus;
  }
}