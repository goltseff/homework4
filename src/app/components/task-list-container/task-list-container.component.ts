import { Component, OnInit } from '@angular/core';
import { ToDoService, ITodoItemData } from '../../services/todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list-container',
  templateUrl: './task-list-container.component.html'
})
export class TaskListContainerComponent implements OnInit {
  public items: ITodoItemData[] = [];

  constructor(
    private todoService: ToDoService,
    private router: Router
  ) {
    this.todoService.loadItemsFromLS();
    this.items = this.todoService.items;
   }

  ngOnInit() {
  }
  delTodo(e: string) {
    const tmpint = parseInt(e, null);
    this.todoService.removeItem(tmpint);
    this.items = this.todoService.items;
  }
  editTodo(e: string) {
    this.router.navigate(['/list/' + e]);
  }
  addTodo() {
    this.router.navigate(['/list/new']);
  }

}
