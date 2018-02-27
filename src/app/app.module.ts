import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HttpInterceptorService } from './services/http-interceptor.service';
import { ToDoService } from './services/todo.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LeaveGuardService } from './services/leave-guard.service';

import { LoginContainerComponent } from './components/login-container/login-container.component';
import { TaskViewContainerComponent } from './components/task-view-container/task-view-container.component';
import { TaskListContainerComponent } from './components/task-list-container/task-list-container.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { LayoutComponent } from './components/layout/layout.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginContainerComponent },
  {
    path: 'list',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: TaskListContainerComponent},
      { path: ':id', component: TaskViewContainerComponent, canDeactivate: [LeaveGuardService] },
    ]
  },
  // { path: 'list', component: TaskListContainerComponent, canActivate: [AuthGuardService]},
  // { path: 'list/:id', component: TaskViewContainerComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    TaskViewContainerComponent,
    TaskListContainerComponent,
    TaskItemComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ToDoService,
    UserService,
    AuthGuardService,
    LeaveGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
