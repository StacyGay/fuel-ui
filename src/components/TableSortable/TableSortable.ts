import {Component, ChangeDetectionStrategy, Input} from 'angular2/core'
import {CORE_DIRECTIVES, JsonPipe} from 'angular2/common'
import {OrderByPipe} from "../../pipes/OrderBy/OrderBy"
import {MapToIterablePipe} from "../../pipes/MapToIterable/MapToIterable"
import {FormatPipe} from "../../pipes/Format/Format"
import {TableSortableColumn} from "./TableSortableColumn";
import {TableSortableSorting} from "./TableSortableSorting";
import {tableSortableHtml} from "./tableSortable.Html";

@Component({
  selector: 'table-sortable',
  template: tableSortableHtml,
  directives: [CORE_DIRECTIVES],
  pipes: [OrderByPipe, JsonPipe, MapToIterablePipe, FormatPipe]
})
export class TableSortable {
  
  @Input() columns: TableSortableColumn[];
  @Input() data: any[];
  @Input() sort: TableSortableSorting;
    
  constructor() {}
  
  selectedClass(columnName: string): string{
    return columnName == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
  }
  
  changeSorting(columnName: string): void{
    var sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }
  
  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }
}

export var TABLESORTABLE_PROVIDERS = [
    TableSortable
];
export {TableSortableColumn} from "./TableSortableColumn";
export {TableSortableSorting} from "./TableSortableSorting";