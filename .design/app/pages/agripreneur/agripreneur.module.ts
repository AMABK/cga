import {SharedModule} from './../../shared/shared.module';
import {AgripreneurProfileComponent} from './agripreneur-profile/agripreneur-profile.component';
import {AgripreneurComponent} from './agripreneur/agripreneur.component';
import {AddAgripreneurComponent} from './add-agripreneur/add-agripreneur.component';
import { CommonModule } from '@angular/common';
import { AgripreneurRoutingModule } from './agripreneur-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
  	AddAgripreneurComponent,
  	AgripreneurComponent,
  	AgripreneurProfileComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        AgripreneurRoutingModule
    ]
})
export class AgripreneurModule { }
