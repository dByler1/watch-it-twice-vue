<template>
  
   <div class="row">
        <div class="col-12 col-md-8">
            <h4 class="mb-3 text-uppercase lead">Feed of the future</h4>
            <ul class="list-unstyled" v-if="reviews.length > 0">
                <li class="media mb-5 d-flex" v-for="review of reviews.slice().reverse()" v-bind:key="review._id">
                    <!-- if this.Poster 'N/A' -->
                    <div class="poster-resize mr-3" v-if="review.imgURL === 'N/A'">
                        <div class="poster-na poster img-thumbnail">No Poster Available</div>
                    </div>

                    <!-- if there is a poster -->
                    <div class="poster-resize mr-3" v-else>
                        <div class="poster img-thumbnail" v-bind:style="{ backgroundImage: 'url('+ review.imgURL +')'}"></div>
                    </div>
                
                    <div class="media-body">
                        <b-button router-tag="button" :to="'/detail/'+ review.movieID" variant="outline-secondary">{{review.movieName}}</b-button>
                         <router-link tag="a" role="button" :to="'/profile/'+ review.user" >
                            <div class="d-flex align-items-center mt-2 mb-2">
                                <span class="mr-2">{{review.userName}} </span> 
                                <span class="badge badge-primary">{{review.rating}} of 5</span>
                            </div>
                        </router-link>
                        <span class="mb-3 d-block">{{review.date}}</span>
    
                        <Review v-if="review.reviewString" :review="review"></Review>
                        
                    </div>
                </li>
            </ul>
            <p class="mb-5" v-else>Sorry, there were no reviews.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Review from '../resources/elements/Review';

export default {
    name: "Feed",
    components: {
        Review
    },
    data() {
        return {
            reviews: [],
            show_hide_text: "Show More"
        }
    },
    methods: {
    },
    created() {
        axios.get('review/all-reviews')
        .then(res => {
            this.reviews = res.data.data
        })
        .catch(err => { 
            console.log(err)
            console.log(err.response)
        })
    }
}
</script>

<style scoped>

    .poster-resize {
        max-width: 150px;
        width: 100%;
    }

    .poster-resize .poster {
    width: 100%;
    padding-top: 142%;
    background-size: contain;
    }

    /* padding-top equation */
    /* (height) / (width) = ? */

    .poster-resize .poster-na {
        background: #A09F9F;
        color: #fff;
    }


    /*=== Small Screens ===*/

    @media (max-width: 568px) {
        .poster-resize {
            max-width: 75px;
        }
    }
</style>