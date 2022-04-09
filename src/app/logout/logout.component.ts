import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') !== null){ //Delete any tokens and go back to home page
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('type');
    }
  }

  goHome() {
    this.router.navigate(['/']);
    setTimeout(location.reload.bind(location), 500);
  }

}
