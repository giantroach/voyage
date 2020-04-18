import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogComponent } from './shared/components/log/log.component';
import { StatusComponent } from './shared/components/status/status.component';
import { TaskComponent } from './shared/components/task/task.component';
import { ActiveTaskComponent } from './shared/components/active-task/active-task.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LogComponent,
    StatusComponent,
    TaskComponent,
    ActiveTaskComponent,
    TasksComponent,
    EditTaskComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
