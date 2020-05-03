import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogComponent } from './shared/components/log/log.component';
import { StatusComponent } from './shared/components/status/status.component';
import { TaskComponent } from './shared/components/task/task.component';
import { ActiveTaskComponent } from './shared/components/active-task/active-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { VisualComponent } from './shared/components/visual/visual.component';
import { ShipVisualComponent } from './shared/components/ship-visual/ship-visual.component';
import { MenuItemComponent } from './shared/components/menu-item/menu-item.component';
import { ShipExpandComponent } from './pages/ship-expand/ship-expand.component';
import { ShipEditComponent } from './pages/ship-edit/ship-edit.component';
import { ShipDetailComponent } from './pages/ship-detail/ship-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LogComponent,
    StatusComponent,
    TaskComponent,
    ActiveTaskComponent,
    EditTaskComponent,
    TaskListComponent,
    HeaderComponent,
    VisualComponent,
    ShipVisualComponent,
    MenuItemComponent,
    ShipExpandComponent,
    ShipEditComponent,
    ShipDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
