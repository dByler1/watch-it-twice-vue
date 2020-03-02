<template>
<div>
    <div class="row">
        <!-- {{> messages }} -->
        <div class="col-12">
            <div class="media mt-5 mb-5 d-flex flex-column flex-md-row">
                <img :src="detail.Poster" class="mr-4 img-thumbnail" alt="...">
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
                                        <a v-if="!this.$store.getters.isAuthenticated" class="btn btn-secondary btn-block mt-3" @click="toLogin()" role="button">Please login to add a review</a>
                                    </form>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 mt-5 mb-5">
                                    <h5>Reviews</h5>
                                    
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
                                                
                                                <p class="pre-wrap review-string-background">{{review.reviewString}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <p v-if="!reviews">No reviews yet - be the first!</p>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                   
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="row">
        <div class="col-md-6 col-sm-12">
            <form @submit.prevent="createReview()">
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
                <a v-if="!this.$store.getters.isAuthenticated" class="btn btn-secondary btn-block mt-3" @click="toLogin()" role="button">Please login to add a review</a>
            </form>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-sm-12 mt-5 mb-5">
            <h5>Reviews</h5>
            
            <ul v-if="reviews" class="list-group list-group-flush">
                <li class="list-group-item" v-for="review of reviews.slice().reverse()" v-bind:key="review.imdbID">
                    <div class="review-div-background">
                        <router-link tag="a" :to="'/profile/'+ review.user" class="mt-3 mb-1">
                            <p>{{review.userName}} <span>{{review.date}}</span></p>
                        </router-link>
                        
                        <span class="badge badge-primary">{{review.rating}} of 5</span>
                        <p class="pre-wrap review-string-background">{{review.reviewString}}</p>
                    </div>
                </li>
            </ul>
            <p v-if="!reviews">No reviews yet - be the first!</p>
        </div>
    </div> -->
</div>

</template>

<script>
import axios from "axios";
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
  name: 'Detail',
  props: ['imdbID'],
  data () {
      return {
          detail: {},
          reviews: [],
          addReviewData: {
              reviewString: null,
              rating: null
          }
      }
  },
  methods: {
      createReview() {
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
                userName: this.getUserData.username
            }
        })
        .then(data => { // eslint-disable-line no-unused-vars
            this.addReviewData.reviewString = null;
            this.addReviewData.rating = null;
            axios.get(`review/reviews-by-id/${this.imdbID}`)
            .then(res => {
                console.log(res)
                if (res === 'Aleady reviewed this movie') {
                    return console.log(res)
                }
                this.reviews = this.formatDate(res.data.data)
            })
        })
        .catch(err => { 
            console.log(err)
            //console.log(err.response)
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
                    console.log(res.data)
          this.detail = res.data;
        } catch (e) {
          console.log(e)
        }

        try {
            const reviewCall = await axios.get(`review/reviews-by-id/${this.imdbID}`)
            console.log(reviewCall.data)
            const formattedReviewCall = await this.formatDate(reviewCall.data.data);
            this.reviews = formattedReviewCall;
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
