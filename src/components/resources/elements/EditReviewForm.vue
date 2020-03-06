<template>
  <div class="review-div-background">
      <router-link tag="a" :to="'/detail/'+ review.movieID" class="mt-3 mb-1">
          <h5>{{review.movieName}} <span class="badge badge-primary">{{review.rating}} of 5</span></h5>
      </router-link>
      
      <p>{{review.userName}} <span>{{review.date}}</span></p>
      <Review v-if="review.reviewString" :review="review"></Review>
      <div class="mt-3" v-if="jwtData && jwtData.userID === review.user">
          <button type="button" 
              class="btn btn-secondary" 
              @click="toggleVisibility()">
              Edit
          </button>
      </div>
      <form class="form-group mt-4" @submit.prevent="editReview(review._id)" v-show="showForm">
          <div class="form-group">
              <textarea v-model="newReviewData.reviewString" class="form-control" :id="review._id" name="reviewString" rows="6" ></textarea>
          </div>
          <div class="form-group mb-4">
            <b-form-select v-model="newReviewData.rating" :options="rating_options"></b-form-select>
          </div>
          <div class="d-flex justify-content-between">
            <button type="button" @click.prevent="deleteReview(review._id)" role="button" class="btn btn-danger mb-2"><b-icon-trash></b-icon-trash></button>
            <div>
              <button class="btn btn-secondary mb-2 mr-1" @click.prevent="toggleVisibility()">Cancel</button>
              <button type="submit" class="btn btn-primary mb-2">Submit Edit</button>
            </div>
            
          </div>
          
      </form>
  </div>

</template>

<script>
import Review from './Review';

export default {
  props: ['review', 'jwtData'],
  name: 'EditReviewFrom',
  components: {
    Review
  },
  data () {
    return {
      showForm: false,
      newReviewData: {
          reviewString: this.review.reviewString,
          rating: this.review.rating,
          reviewID: null
      },
      rating_options: [
        { value: null, text: 'Please select an option' },
        { value: 0, text: "0" },
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" }
      ]

    }
  },
  methods: {
      toggleVisibility() {
      this.showForm = !this.showForm
    },
      editReview(reviewID) {
        this.newReviewData.reviewID = reviewID;
        this.$emit('editReview', this.newReviewData);
        this.toggleVisibility()
      },
      deleteReview(reviewID) {
        this.$emit('deleteReview', reviewID)
      }
  }
}
</script>

<style>

</style>