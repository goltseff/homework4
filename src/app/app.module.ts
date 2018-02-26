import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { HttpInterceptorService } from './services/http-interceptor.service';
import { ToDoService } from './services/todo.service';
import { UserService } from './services/user.service';

import { LoginContainerComponent } from './components/login-container/login-container.component';
import { TaskViewContainerComponent } from './components/task-view-container/task-view-container.component';
import { TaskListContainerComponent } from './components/task-list-container/task-list-container.component';
import { TaskItemComponent } from './components/task-item/task-item.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginContainerComponent },
  { path: 'list', component: TaskListContainerComponent},
  { path: 'list/:id', component: TaskViewContainerComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    TaskViewContainerComponent,
    TaskListContainerComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ToDoService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
