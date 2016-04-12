export let tableSortableHtml = `
<table class="table table-hover table-striped table-sortable">
  <thead>
    <tr>
      <th *ngFor="#column of columns" [class]="selectedClass(column.variable)" (click)="changeSorting(column.variable)">
        {{column.display}}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="#object of data | orderBy : convertSorting()">
        <td *ngFor="#key of object | mapToIterable; #i = index">
            {{object[columns[i].variable] | format : columns[i].filter }}
        </td>
    </tr>
  </tbody>
</table>
`;