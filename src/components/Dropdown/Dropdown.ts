import {Component, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {dropdownHtml} from "./dropdown.html";

@Component({
    selector: "dropdown",
    template: dropdownHtml
})

export class Dropdown {
    @Input() label: string;
    dropdownOpen: boolean = false;
    
    public toggleDropdown() : void{
        this.dropdownOpen = !this.dropdownOpen;
    }
}

export var DROPDOWN_COMPONENT_PROVIDERS = [
    Dropdown
];