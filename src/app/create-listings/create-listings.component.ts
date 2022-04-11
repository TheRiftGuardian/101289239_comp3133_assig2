import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-create-listings',
  templateUrl: './create-listings.component.html',
  styleUrls: ['./create-listings.component.css']
})
export class CreateListingsComponent implements OnInit {

  username: any = null;
  type: any = null;
  listingForm: any;


  constructor(private router: Router, private db: GraphqlService) { 
    this.username = localStorage.getItem('username');
    this.type = localStorage.getItem('type');

    console.log(this.type)

    if(this.type === 'customer' || this.type == null){
      alert('Not Allowed! Only Admins Have Access To This Page!');
      this.router.navigate(['/']);
    }

    this.listingForm = new FormGroup({
      listing_id: new FormControl("", Validators.required),
      listing_title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      postal_code: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      username: new FormControl(this.username)
    })

  }

  ngOnInit(): void {
  }


  onSubmit() {
    if(this.listingForm.valid) {

      if (this.listingForm.value.price < 0)
      {
        alert("Price of listing should be 0 or positive!");
        return
      }

      if (this.listingForm.value.description.length > 1000)
      {
        alert("Description length cannot be more than 1000 characters!");
        return
      }


      if (!(this.validateEmail(this.listingForm.value.email)))
      {
        alert("Email must be in proper email format!");
        return
      }

      console.log(this.listingForm.value)
      this.db.createListing(this.listingForm.value).subscribe((res: any) => {
        console.log(res.data)
        alert(`Listing ${res.data.createListing.listing_title} Created`);
        this.router.navigate(['/']);
        setTimeout(location.reload.bind(location), 500);
      });
    }
  }

  validateEmail(email: any) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

}
