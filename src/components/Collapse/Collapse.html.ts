export let collapseHtml = `
<p>
  <button class="btn btn-primary" type="button" aria-expanded="false" (click)="toggleCollapse()">
    {{buttonText}}
  </button>
</p>

<div class="collapse fuel-ui-collapse" *ngIf="showCollapse">
  <div class="card card-block">
    <ng-content></ng-content>
  </div>
</div>
`;