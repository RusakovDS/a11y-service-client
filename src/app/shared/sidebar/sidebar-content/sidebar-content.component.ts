import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu-content",
  templateUrl: "./sidebar-content.component.html",
  styleUrls: ["./sidebar-content.component.scss"],
})
export class SidebarContentComponent implements OnInit {
  itemList: object[] = [
    { name: "Projects", href: "projects", image: "folder" },
    { name: "Reports", href: "reports", image: "report" },
  ];

  constructor() {}

  ngOnInit(): void {}
}
