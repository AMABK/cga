import {TitleCase} from './pipes/title-case';
import {Functions} from './_helpers/functions';
import {SharedModule} from './shared/shared.module';
import {Constants} from './_helpers/constants';
import {AgripreneurModule} from './pages/agripreneur/agripreneur.module';
import {SettingsModule} from './pages/settings/settings.module';
import {ActivityTrackerModule} from './pages/activity-tracker/activity-tracker.module';
import {TransactionsModule} from './pages/transactions/transactions.module';
import {NotificationsModule} from './pages/notifications/notifications.module';
import {MembersModule} from './pages/members/members.module';
import {AuthModule} from './pages/auth/auth.module';
import {UsersModule} from './pages/users/users.module';
import {SecureInnerPagesGuard} from './_services/secure-inner-pages.guard';
import {AuthGuard} from './_services/auth.guard';
import {AuthService} from './_services/auth.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { RouterModule } from '@angular/router';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

FullCalendarModule.registerPlugins([dayGridPlugin,listPlugin,timelinePlugin,interactionPlugin]);

@NgModule({
  declarations: [,AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    NavbarModule,
    SharedModule,
    FullCalendarModule,
    SidebarModule,
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    UsersModule,
    AuthModule,
    MembersModule,
    NotificationsModule,
    TransactionsModule,
    ActivityTrackerModule,
    SettingsModule,
    AgripreneurModule
  ],
  providers: [
      authInterceptorProviders,
      AuthService,
      AuthGuard,
      SecureInnerPagesGuard,
      Constants,
      Functions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
