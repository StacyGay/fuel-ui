import {Component, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {collapseHtml} from "./collapse.html";

@Component({
    selector: "collapse",
    template: collapseHtml
})

export class Collapse {
    @Input() buttonText: string;
    showCollapse: boolean = false;
    
    public toggleCollapse() : void{
        this.showCollapse = !this.showCollapse;
    }
    
}

export var COLLAPSE_PROVIDERS = [
    Collapse
];