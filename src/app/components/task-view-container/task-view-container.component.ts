import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { ToDoService, ITodoItemData } from '../../services/todo.service';

interface ITagsChecked {
  checked: boolean;
  name: string;
}

@Component({
  selector: 'app-task-view-container',
  templateUrl: './task-view-container.component.html'
})
export class TaskViewContainerComponent implements OnInit {
  public itemId;
  public isNew = false;
  public todoitem: ITodoItemData;
  public edited_tags: ITagsChecked[] = [];
  private tags: string[] = [];
  public statuses_dictionary = [];
  public items: ITodoItemData[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private todoService: ToDoService,
  ) {
    this.todoService.loadItemsFromLS();
    this.statuses_dictionary = this.todoService.statuses_dictionary;
    this.tags = this.todoService.tags_dictionary;
    this.items = this.todoService.items;
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url.indexOf('/list/') !== -1) {
        this.initComponent();
      }
    });


  }

  private initComponent() {
    if (this.activatedRoute.snapshot.paramMap.get('id') === 'new') { this.isNew = true; }
    this.itemId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), null);
    if (isNaN(this.itemId)) { this.itemId = 0; }
    // проверяем есть ли такой таск и если нет - редиректим на лист
    if (!this.isNew && !this.todoService.isExists(this.itemId)) {
      console.log('task not found');
      this.router.navigate(['/list']);
    }
    this.todoitem = {
      id: 0,
      desc: '',
      name: '',
      status: 0,
      tags: [],
      type: ''
    };
    const tmp_array = [];
    this.tags.forEach(function (value) {
      const agg_tag: ITagsChecked = {
        checked: false,
        name: value
      };
      tmp_array.push(agg_tag);
    });
    this.edited_tags = tmp_array;

    if (this.itemId > 0) {
      this.todoitem.id = this.itemId;
      this.todoitem = this.todoService.getItemByID(this.todoitem.id);
      const tags = this.todoitem.tags;
      this.edited_tags.forEach(function (value) {
        value.checked = false;
        let needchange = false;
        tags.forEach(function (value2) {
          if (value.name === value2) { needchange = true; }
        });
        if (needchange) { value.checked = true; }
      });
    }
  }

  ngOnInit() {
    this.initComponent();
  }



  updateCheckboxes(event) {
    const name: string = event.target.id.substring(3);
    this.edited_tags.forEach(function (value, index) {
      if (value.name === name) {
        if (event.target.checked) { value.checked = true; } else { value.checked = false; }
      }
    });
  }

  saveTodo(p_edit_name, p_edit_dscr, p_edit_status) {
    let error = '';
    const checked_tags = [];
    if (p_edit_name.value === '') { error = 'Не задан заголовок'; }
    if (p_edit_dscr.value === '') { error = 'Не задано описание'; }

    if (error === '') {
      this.edited_tags.forEach(function (value, index) {
        if (value.checked === true) { checked_tags.push(value.name); }
        value.checked = false;
      });
      if (this.isNew) { this.todoitem.id = Date.now(); }
      this.todoitem.name = p_edit_name.value;
      this.todoitem.desc = p_edit_dscr.value;
      this.todoitem.status = parseInt(p_edit_status.value, null);
      this.todoitem.tags = checked_tags;
      this.todoService.setItem(this.todoitem);
      this.router.navigate(['/list']);
    } else {
      alert(error);
    }

  }
  delTodo(e: string) {
    const tmpint = parseInt(e, null);
    this.todoService.removeItem(tmpint);
    this.items = this.todoService.items;
  }

}
