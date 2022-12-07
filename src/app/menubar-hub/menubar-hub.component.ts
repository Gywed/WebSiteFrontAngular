import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menubar-hub',
  templateUrl: './menubar-hub.component.html',
  styleUrls: ['./menubar-hub.component.css']
})
export class MenubarHubComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showDropdownCategory(category_content: HTMLDivElement) {
    if(category_content.style.display=='none'){
      category_content.style.display='block';
    }
    else if(category_content.style.display=='block'){
      category_content.style.display='none';
    }
  }
}
