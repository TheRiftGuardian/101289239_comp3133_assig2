import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings: any;
  type: any = null;
  username: any = null;

  constructor(private router: Router, private db: GraphqlService) {
    this.type = localStorage.getItem('type');
    if (this.type === null) {
      alert('You are not allowed access to this page! You must login.');
      this.router.navigate(['/']);
    }
    this.username = localStorage.getItem('username');
   }

  ngOnInit(): void {
    this.db.getUserBookings(this.username).subscribe((res: any) => {
      this.bookings = res.data.getUserBookings;
    })
  }

}
