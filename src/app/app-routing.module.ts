import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { ShipConfigComponent } from './pages/ship-config/ship-config.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: EditTaskComponent },
  { path: 'tasks/new/:task', component: EditTaskComponent },
  { path: 'ship', component: ShipConfigComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
