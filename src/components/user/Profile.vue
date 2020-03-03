<template>
    <!-- {{> messages }} -->
    <div>
        <div class="row">
            <div class="col mt-5">
                <h1>Profile</h1>
                <h2>{{username}}</h2>
            </div>
        </div>
        <div class="row">
            
            <div class="col-md-8 col-sm-12 mt-3 mb-5">
                <h5>Reviews</h5>
                <!-- {{#if reviews}} -->
                <ul v-if="this.reviews" class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(review) of reviews.slice().reverse()" v-bind:key="review._id">
               
                        <EditReviewForm :review="review" :jwtData="jwtData" v-on:editReview="editReview($event)" v-on:deleteReview="deleteReview($event)"></EditReviewForm>
                    </li>
                </ul>
                <p v-if="!this.reviews">You haven't made any reviews yet.</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex'
import EditReviewForm from '../resources/elements/EditReviewForm';

export default {
    name: 'Profile',
    props: ['userID'],
    components: {
        EditReviewForm
    },
    data() {
        return {
            reviews: [],
            username: null
        }
    },
    methods: {
        editReview(newReviewData) {
          axios({
              method: "POST",
              url: 'review/edit-review',
              data: {
                  id: newReviewData.reviewID,
                  rating: newReviewData.rating,
                  reviewString: newReviewData.reviewString
              }
          })
          .then(res => {// eslint-disable-line no-unused-vars
              console.log(res)
       
              for(var i = this.reviews.length - 1; i >= 0; i--) {
                  if(this.reviews[i]._id === newReviewData.reviewID) {
                      if (newReviewData.reviewString) {
                        this.reviews[i].reviewString = newReviewData.reviewString;
                      }

                      if (newReviewData.rating) {
                        this.reviews[i].rating = newReviewData.rating;  
                      }
                      
                      
                  }
              }
          })
          .catch(err => {
              console.log(err)
              console.log(err.response)
          })
        },
        deleteReview(reviewID) {
            axios({
              method: "POST",
              url: 'review/delete-review',
              data: {
                  id: reviewID
              }
            })
            .then(res => {// eslint-disable-line no-unused-vars
              for(var i = this.reviews.length - 1; i >= 0; i--) {
                  if(this.reviews[i]._id === reviewID) {
                      this.reviews.splice(i, 1);
                  }
              }
          })
          .catch(err => {
              console.log(err)
              console.log(err.response)
          })
        }
    },
    created() {
        axios.get('review/reviews-by-user/' + this.userID)
        .then(res => {
            this.username = res.data[0].userName
            this.reviews = res.data
        })
        .catch(err => { 
            console.log(err)
            console.log(err.response)
        })
    },
    computed: {
        ...mapGetters(['getUserData', 'jwtData'])
    }
}
</script>