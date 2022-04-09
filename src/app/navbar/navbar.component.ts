import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin: any;
  loggedIn: any;

  constructor() {
    this.admin = localStorage.getItem('type') == 'admin'
    this.loggedIn = localStorage.getItem('token') ? true : false;
   }

  ngOnInit(): void {
  }

}
