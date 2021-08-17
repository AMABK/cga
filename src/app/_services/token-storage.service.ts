import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  timeOut(): void {
    let user = this.getUser();
    user.expired = true;
    this.saveUser(user);
  }

  isExpired(): boolean {
    let user = this.getUser();
    return (user.expired == true);
  }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  
  public getUserType(): any{
    let user: any = this.getUser();
    return user.UserType || '';
  }
  
  public getCompleteSignup(): boolean{
    let user: any = this.getUser();
    return user.CompleteSignup || false;
  }
  
  public setCompleteSignup(CompleteSignup:boolean){
    let user: any = this.getUser();
    Object.assign(user,{CompleteSignup:CompleteSignup});
    this.saveUser(user);
  }
  
  public getUsername(): any{
    let user: any = this.getUser();
    return user.username || '';
  }
  
  public getId(): any{
    let user: any = this.getUser();
    return user.id || '';
  }
}
