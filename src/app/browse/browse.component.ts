import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  search: any;
  listings: any;
  showResults: boolean = false;
  numOfResults: number = 0;
  term: any = null;

  searchForm: any;

  constructor(private router: Router, private db: GraphqlService) { 

    this.searchForm = new FormGroup({
      term: new FormControl("", Validators.required),
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if(this.searchForm.valid) {
      this.db.searchListingByAny(this.searchForm.value.term).subscribe((res: any) => {
        this.listings = res.data.searchListingByAny;
        this.numOfResults = res.data.searchListingByAny.length;
        this.showResults = true;
        this.term = this.searchForm.value.term
      });
    }
  }

}
