import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {


  listings: any;
  listingDetails: any = null;
  listingId: any = null;
  username: any = null;
  type: any = null;

  bookListingForm: any;


  constructor(private router: Router, private db: GraphqlService, private route: ActivatedRoute) {
    this.listingId = this.route.snapshot.params['id'];
    this.username = localStorage.getItem('username');
    this.type = localStorage.getItem('type');

    if (this.type === null) {
      alert("You are not allowed to access this page! Please login.");
      this.router.navigate(['/']);
    }
  
    this.bookListingForm = new FormGroup({
      booking_id: new FormControl("", Validators.required),
      booking_start: new FormControl("", Validators.required),
      booking_end: new FormControl("", Validators.required),
      listing_id: new FormControl(this.listingId),
      username: new FormControl(this.username)
    })
   }

  ngOnInit(): void {
      this.db.searchListingByID(this.listingId).subscribe((res: any) => {
      this.listingDetails = res.data.searchListingByID;
    });
  }

  onSubmit() {
    if(this.bookListingForm.valid) {
      console.log(this.bookListingForm.value)
      this.db.createBooking(this.bookListingForm.value).subscribe((res: any) => {
        alert(`Booking ${res.data.createBooking.booking_id} Created`);
        this.router.navigate(['/bookings']);
        setTimeout(location.reload.bind(location), 500);
      })
    }
  }

}
