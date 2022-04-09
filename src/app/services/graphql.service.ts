import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getAllListings() {
    let query = this.apollo.query({
      query: gql`{
        getAdminListings{
          id
          listing_id
          listing_title
          description
          street
          city
          postal_code
          price
          email
          username
        }
      }`
    })
    return query;
  }

  login(formValues: any) {
    let mutation = this.apollo.mutate({
      mutation: gql`
        mutation login(
          $username: String!,
          $password: String!
        ) {
          login(
            username: $username,
            password: $password
          ) 
        }
      `,
      variables: formValues
    })
    return mutation;
  }

  getCurrentUser() {
    let query = this.apollo.query({
      query: gql`{
        getCurrentUser{
          type
        }
      }
      `, 
      context: {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token')),
      }
    })
    return query;
  }

  getUserBookings(input: any) {
    let query = this.apollo.query({
      query: gql`
      query getUserBookings($username: String!)
        {
          getUserBookings(username: $username) {
          listing_id,
          booking_id,
          booking_date,
          booking_start,
          booking_end,
          username
        }
      }`,
      variables: {username: input }
    })
    return query;
  }

  searchListingByID(input: any) {
    let query = this.apollo.query({
      query: gql`
      query searchListingByID($listing_id: String!)
      {
        searchListingByID(listing_id: $listing_id)
        {
          id
          listing_id
          listing_title
          description
          street
          city
          postal_code
          price
          email
          username
        }
      }
      `,
      variables: {listing_id: input}
    })
    return query;
  }

  searchListingByAny(formValues: any) {
    let query = this.apollo.query({
      query: gql`
      query searchListingByAny($str: String!)
      {
        searchListingByAny(str: $str)
        {
            id
            listing_id
            listing_title
            description
            street
            city
            postal_code
            price
            email
            username
          }
        }
      `,
      variables: {str: formValues }
    })
    return query;
  }

  createBooking(formValues: any) {
    let mutation = this.apollo.mutate({
      mutation: gql`
      mutation createBooking(
        $listing_id: String!,
        $booking_id: String!,
        $booking_start: String!,
        $booking_end: String!,
        $username: String!
        ) {
            createBooking(
              listing_id: $listing_id,
              booking_id: $booking_id,
              booking_start: $booking_start,
              booking_end: $booking_end,
              username: $username
          ) 
          {
            listing_id
            booking_id
            booking_date
            booking_start
            booking_end
            username
          }
        }`,
      variables: formValues
    })
    return mutation;
  }

  createUser(formValues: any){
    let mutation = this.apollo.mutate({
      mutation: gql`
      mutation createUser(
        $username: String!,
        $firstname: String!,
        $lastname: String!,
        $password: String!,
        $email: String!,
        $type: String!
      ){
        createUser(
          username: $username,
          firstname: $firstname,
          lastname: $lastname,
          password: $password,
          email: $email,
          type: $type,
        ){
          username
          firstname
          lastname
          password
          email
          type
        }
      }`,
      variables: formValues
    })
    return mutation;
  }

  createListing(formValues: any){
    let mutation = this.apollo.mutate({
      mutation: gql`
      mutation createListing(
        $listing_id: String!,
        $listing_title: String!,
        $description: String!,
        $street: String!,
        $city: String!,
        $postal_code: String!,
        $price: Float!,
        $email: String!,
        $username: String!
      ){
        createListing(
          listing_id: $listing_id,
          listing_title: $listing_title,
          description: $description,
          street: $street,
          city: $city,
          postal_code: $postal_code,
          price: $price,
          email: $email,
          username: $username
        ){
          listing_id
          listing_title
          description
          street
          city
          postal_code
          price
          email
          username
        }
      }`,
      variables: formValues
    })
    console.log(formValues)
    return mutation;
  }

}
