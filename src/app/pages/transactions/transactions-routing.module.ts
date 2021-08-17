import {TransactionDetailsComponent} from './transaction-details/transaction-details.component';
import {TransactionsComponent} from './transactions.component';
import {AuthGuard} from './../../_services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: TransactionsComponent, canActivate:[AuthGuard]},
	{ path: 'details/:id', component: TransactionDetailsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
