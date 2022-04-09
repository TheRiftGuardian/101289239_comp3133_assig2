import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private db: GraphqlService) {
    this.username = localStorage.getItem('username');
   }

   username: any;
   hide: boolean = true;




signupForm = new FormGroup({
    username: new FormControl("", Validators.required),
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required)
  })



   ngOnInit(): void {
    if(localStorage.getItem('token') !== null){ //Delete any tokens and go back to home page
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('type');
    }
  }

  onSubmit(){
    if(this.signupForm.valid) {
      console.log(this.signupForm.value)
      this.db.createUser(this.signupForm.value).subscribe((res: any) => {
        alert(`User ${res.data.createUser.username} Created`);
        this.router.navigate(['/login']);
      });
    }
  }

}
