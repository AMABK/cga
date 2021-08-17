import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../_services/user.service";
import {AuthService} from "../../../_services/auth.service";
import {TokenStorageService} from "../../../_services/token-storage.service";
import {ToastrModule} from "ngx-toastr";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  form: FormGroup;
  pk: string = 'id';
  id: string;
  errorMessage: string = '';
  title: string;
  isMe: boolean;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private toastr: ToastrModule) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isMe = !this.id;
    this.title = this.isMe? 'My Profile' : 'User Profile';
    const user = this.tokenStorage.getUser();
    this.id = this.isMe? user.id : this.id;

    this.form = this.formBuilder.group({
      Title: [{value:'',disabled:true}, Validators.required],
      username: [{value:'',disabled:true}, Validators.required],
      FullName: [{value:'',disabled:true}, Validators.required],
      email: [{value:'',disabled:true}, [Validators.required, Validators.email]],
      UserType: [{value:'',disabled:true}, Validators.required],
      PhoneNo: [{value:'+254',disabled:true}, Validators.required],
      Company: [{value:'Cerial Growers Association',disabled:true}]
    });

    /* autopopulate if the profile selected is belongs to logged in user*/
    if(this.isMe) this.form.patchValue(user);

    /* fetch more current details from api server */
    this.userService.get(this.id).pipe(first()).subscribe(x => this.form.patchValue(x));
  }

  get f() { return this.form.controls; }
}

