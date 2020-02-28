<template>
  <div class="movie-list">
        <div class="row mt-5 mb-5">
            <div class="col-6">
                <form @submit.prevent="omdbAPICall(text_input)">
                    <div class="form-group">
                        <input v-model="text_input" id="search" name="search" class="form-control" placeholder="Search again" />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Search</button>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-8">
                <h4 class="mb-3 text-uppercase lead">{{ search_term }}</h4>
                <ul class="list-unstyled" v-if="movies.length > 0">
                    <li class="media mb-4 d-flex align-items-center" v-bind:key="movie.imdbID" v-for="movie of movies">
                        <!-- if this.Poster 'N/A' -->
                        <div class="poster-resize mr-3" v-if="movie.Poster === 'N/A'">
                            <div class="poster-na poster img-thumbnail">No Poster Available</div>
                        </div>

                        <!-- if there is a poster -->
                        <div class="poster-resize mr-3" v-else>
                            <div class="poster img-thumbnail" v-bind:style="{ backgroundImage: 'url('+ movie.Poster +')'}"></div>
                        </div>
                    
                        <div class="media-body">
                            <router-link tag="b-button" :to="'/detail/'+ movie.imdbID" class="mt-3 mb-1">{{movie.Title}}</router-link>
                            <ul class="list-group">
                                <li class="list-group-item text-secondary border-top-0 border-right-0 border-left-0"><span class="font-weight-bold">Year: </span>{{movie.Year}}</li>
                                <li class="list-group-item text-secondary border-top-0 border-right-0 border-left-0"><span class="font-weight-bold">Type: </span>{{movie.Type}}</li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <p class="mb-5" v-else>Sorry, there were no results. Please search again.</p>
            </div>
        </div>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'List',
        props: ['search_term'],
        data () {
            return {
                movies: [],
                text_input: ''
            }
        },
        created() {
            this.omdbAPICall(this.search_term)
        },
        methods: {
            async omdbAPICall(searchTerm) {
                try {
                    //const res = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=85f5c0de`);
                    const res = await axios({
                        method: "GET",
                        url: `https://www.omdbapi.com/?s=${searchTerm}&apikey=85f5c0de`,
                        transformRequest: [(data, headers) => { delete headers.common.Authorization; return data }]
                    })
                    const data = await this.findDuplicates(res.data.Search);
                    this.movies = data;
                } catch (e) {
                    console.log(e)
                }
            },
            findDuplicates(data) {
                data = data.filter((el, index, self) =>
                    index === self.findIndex((t) => (
                        t.imdbID === el.imdbID
                    ))
                )
                return data
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
