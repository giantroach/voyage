import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { ShipDetailComponent } from './pages/ship-detail/ship-detail.component';
import { ShipExpandComponent } from './pages/ship-expand/ship-expand.component';
import { ShipEditComponent } from './pages/ship-edit/ship-edit.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: EditTaskComponent },
  { path: 'tasks/new/:task', component: EditTaskComponent },
  { path: 'ship', component: ShipDetailComponent },
  { path: 'ship/expand', component: ShipExpandComponent },
  { path: 'ship/edit', component: ShipEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
