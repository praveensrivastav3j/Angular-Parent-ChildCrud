import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  userData: any = [];

  @Output() updateData: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    if (localStorage.getItem(environment.localstorageKey)) {
      this.userData = JSON.parse(localStorage.getItem(environment.localstorageKey) || '');
    }
  }

  UpdateData(user_id: number) {
    this.updateData.emit(user_id);
  }

  DeleteData(user_id: number) {
    if (user_id) {
      let index = this.userData.findIndex((x: any) => x.id == user_id);
      this.userData.splice(index, 1);
      localStorage.setItem(environment.localstorageKey, JSON.stringify(this.userData));
    }
  }
}
