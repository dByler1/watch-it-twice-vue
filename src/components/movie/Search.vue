<template>
  <div class="search-home">
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <form @submit.prevent="navToList()">
                    <div class="form-group">
                        <label class="text-center mb-3" for="search"><i class="fas fa-sign-in-alt"></i>Search for a Movie or Show</label>
                        <input type="text" id="search" name="search" class="form-control" placeholder="Search for a movie" v-model="search_term" required/>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Search</button>
                </form>
            </div>
        </div>
    </div>
    <div class="row mt-5 mb-5">
        <div class="col-12 col-md-8 offset-md-4 m-auto">
            <ul class="list-unstyled">
                <li class="media d-flex mb-4 align-items-center p-0 p-md-3">
                    <!-- {{#if this.imgURL}}
                    <div class="poster-resize mr-3">
                        <div class="poster img-thumbnail" style="background: url('{{this.imgURL}}') no-repeat center; background-size: contain;"></div>
                    </div>
                     {{/if}} -->
                    <!-- <div class="media-body">
                        <a href="/movie/detail/{{this.movieID}}" role="button"><h5 class="mt-3 mb-1 text-body">{{this.movieName}}</h5></a>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <p class="text-capitalize text-secondary">{{this.userName}} <span>{{this.date}}</span></p>
                                <span class="badge badge-primary">{{this.rating}} of 5</span>
                                <span class="text-secondary">{{this.reviewString}}</span>
                            </li>
                        </ul>
                    </div> -->
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Search',
  data () {
      return {
          search_term: null
      }
  },
  methods: {
      navToList() {
          this.$router.push({path: `/list/${this.search_term}`});
      },
      increment() {
        this.$store.commit('increment')
      }
  },
  computed: {
      jwtData () {
          return this.$store.getters.jwtData
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
