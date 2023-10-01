import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

export interface ColumnDef {
  header: string;
  field: string;
  type: string; // action/no-action column
}

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class TableComponent implements AfterViewInit {
  @Input() title = '';
  @Input() isAddAvailable = true;
  @Input() data: any;

  @Output() emitAddNewClicked = new EventEmitter<boolean>();
  @Output() emitEditClicked = new EventEmitter<any>();
  @Output() emitDeletedClicked = new EventEmitter<any>();

  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = [];
  public searchValues!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _columnDef: ColumnDef[] = [];
  get columnDef(): ColumnDef[] {
    return this._columnDef;
  }

  @Input() set columnDef(value: ColumnDef[]) {
    if (value.length >= 0) {
      this._columnDef = value;
      value.forEach((elem) => this.displayedColumns.push(elem.field));
    }
  }

  ngAfterViewInit() {
    // to prevent ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  handleClickAddNew(){
    this.emitAddNewClicked.emit(true);
  }

  handleEditClicked(element: any){
    this.emitEditClicked.emit(element);
  }
  handleDeleteClicked(element:any){
    this.emitDeletedClicked.emit(element);
  }
}
