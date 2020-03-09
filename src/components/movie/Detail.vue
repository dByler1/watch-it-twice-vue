<template>
<div>
    <div class="row">
        <!-- {{> messages }} -->
        <div class="col-12">
            <div class="media mt-5 mb-5 d-flex flex-column flex-md-row">
                <img v-if="!(detail.Poster === 'N/A')" :src="detail.Poster" class="mr-4 img-thumbnail" alt="...">
                <div class="media-body">
                    <b-tabs content-class="mt-4">
                        <b-tab title="Details"> <h5 class="mt-0">{{detail.Title}}</h5>
                            <p class="card-text">{{detail.Plot}}</p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><span class="font-weight-bold">Genre: </span>{{detail.Genre}}</li>
                                <li class="list-group-item"><span class="font-weight-bold">Writer: </span>{{detail.Writer}}</li>
                                <li class="list-group-item"><span class="font-weight-bold">Actors: </span>{{detail.Actors}}</li>
                                <li class="list-group-item"><span class="font-weight-bold">Awards: </span>{{detail.Awards}}</li>
                            </ul>
                        </b-tab>
                        <b-tab title="Reviews">
                            <div class="row">
                                <div class="col-sm-12">
                                    <form @submit.prevent="createReview()">
                                        <div v-for="(message, index) of addReviewErrorMessages" :key="index" >
                                            <ErrorMessage :message="message" ></ErrorMessage>
                                        </div>
                                        <div class="form-group">
                                            
                                            <label for="addDetailReview">Add a Review</label>
                                            <textarea v-model="addReviewData.reviewString" class="form-control" id="addDetailReview" name="reviewString" rows="6" placeholder="What do you think?"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="addDetailReview">Add a Rating</label>
                                            <select v-model="addReviewData.rating" class="form-control" name="rating" id="addDetailRating" placeholder="Rating">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>

                                        <button v-if="this.$store.getters.isAuthenticated" type="submit" class="btn btn-primary btn-block mt-3">Add Review</button>
                                        <button v-if="!this.$store.getters.isAuthenticated" class="btn btn-secondary btn-block mt-3" @click="toLogin()" role="button">Please login to add a review</button>
                                    </form>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 mt-5 mb-5">
                                    <h5>Reviews</h5>
                                    <div v-for="(message, index) of getReviewErrors" :key="index" >
                                        <ErrorMessage :message="message" ></ErrorMessage>
                                    </div>
                                    <ul v-if="reviews" class="list-group list-group-flush">
                                        <li class="list-group-item" v-for="review of reviews.slice().reverse()" v-bind:key="review.imdbID">
                                            <div class="review-div-background">
                                                <router-link tag="a" :to="'/profile/'+ review.user">
                                                    <div class="d-flex align-items-center">
                                                        <span class="mr-2">{{review.userName}} </span> 
                                                        <span class="badge badge-primary">{{review.rating}} of 5</span>
                                                    </div>
                                                </router-link>
                                                <span class="mb-3 mt-1 d-block">{{review.date}}</span>
                                                <Review v-if="review.reviewString" :review="review"></Review>
                                            </div>
                                        </li>
                                    </ul>
                                    <p v-if="!reviews.length">No reviews yet - be the first!</p>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                   
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import axios from "axios";
import moment from 'moment';
import { mapGetters } from 'vuex';
import Review from '../resources/elements/Review';
import ErrorMessage from '../resources/elements/ErrorMessage';

export default {
  name: 'Detail',
  props: ['imdbID'],
  components: {
    Review,
    ErrorMessage
  },
  data () {
      return {
          detail: {},
          reviews: [],
          addReviewData: {
              reviewString: null,
              rating: null
          },
          addReviewErrorMessages: [],
          getReviewErrors: []
      }
  },
  methods: {
      checkForm () {
          
      },
      createReview() {
          if (!this.addReviewData.rating) {
              this.addReviewErrorMessages.push('Please add a rating')
              return
          }
          axios({
            method: "POST",
            url: '/review/add-review',
            headers: {
                'Authorization': this.$store.getters.jwt,
            },
            data: {
                reviewString: this.addReviewData.reviewString,
                rating: this.addReviewData.rating,
                movieID: this.detail.imdbID,
                movieName: this.detail.Title,
                imgURL: this.detail.Poster,
                userName: this.getUserData.username,
                show_hide_text: "Show More"
            }
        })
        .then(data => { // eslint-disable-line no-unused-vars
            this.addReviewData.reviewString = null;
            this.addReviewData.rating = null;
            axios.get(`review/reviews-by-id/${this.imdbID}`)
            .then(res => {
                this.reviews = this.formatDate(res.data.data)
            })
        })
        .catch(err => { 
            console.log(err)
             if (err.response.data === 'Aleady reviewed this movie') {
                    return this.addReviewErrorMessages.push('You aleady reviewed this movie. You can edit your review on your profile page.')
                    //should i reset the vars here? a user might copy/paste their review
                }
            return this.addReviewErrorMessages.push('Sorry about that! There wsa an error reaching the API or returning data. Try reloading the page.')
            
            })
      },
      formatDate (array) {
            array.forEach(el => {
                el.date = moment(el.date).format("MMM Do YYYY");
            });
            return array
      },
      toLogin() {
          this.$router.push( { path: '/login' } )
      }
  },
  computed: {
        ...mapGetters(['getUserData'])
},
  async created() {
      try {
            const res = await axios({
            method: "GET",
            url: `search/id/${this.imdbID}`,
            transformRequest: [(data, headers) => { delete headers.common.Authorization; return data }]
        })
          this.detail = res.data;
        } catch (e) {
            const errDataObj = {
                msg: 'Sorry, there was a problem getting movie details. Try reloading the page and search again.',
                method: 'push'
            }
            this.$store.dispatch('PAGE_ERROR_ACTION', errDataObj)
            //this.pageErrorMessages.push('Sorry, there was a problem getting movie details. Try reloading the page and search again.')
          console.log(e)
        }

        try {
            const reviewCall = await axios.get(`review/reviews-by-id/${this.imdbID}`)
            const dateFormattedReviewCall = await this.formatDate(reviewCall.data.data);
            this.reviews = dateFormattedReviewCall;
        } catch (error) {
            this.getReviewErrors.push('Please add a rating')
            console.log(error)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
