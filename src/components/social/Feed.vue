<template>
  
   <div class="row">
        <div class="col-12 col-md-8">
            <h4 class="mb-3 text-uppercase lead">Feed of the future</h4>
            <ul class="list-unstyled" v-if="reviews.length > 0">
                <li class="media mb-4 d-flex align-items-center" v-for="review of reviews" v-bind:key="review._id">
                    <!-- if this.Poster 'N/A' -->
                    <div class="poster-resize mr-3" v-if="review.imgURL === 'N/A'">
                        <div class="poster-na poster img-thumbnail">No Poster Available</div>
                    </div>

                    <!-- if there is a poster -->
                    <div class="poster-resize mr-3" v-else>
                        <div class="poster img-thumbnail" v-bind:style="{ backgroundImage: 'url('+ review.imgURL +')'}"></div>
                    </div>
                
                    <div class="media-body">
                        <router-link tag="b-button" :to="'/detail/'+ review.movieID" class="mt-3 mb-1">{{review.movieName}}</router-link>
                         <router-link tag="a" :to="'/profile/'+ review.user" class="mt-3 mb-1">
                            <p>{{review.userName}} <span>{{review.date}}</span></p>
                        </router-link>
                        <div><span class="badge badge-primary">{{review.rating}} of 5</span></div>
                        
                        <span>{{review.reviewString}}</span>
                    </div>
                </li>
            </ul>
            <p class="mb-5" v-else>Sorry, there were no reviews.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Feed",
    data() {
        return {
            reviews: []
        }
    },
    methods: {

    },
    created() {
        axios.get('review/all-reviews')
        .then(res => {
            console.log(res)
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