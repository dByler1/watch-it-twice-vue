<template>
  <div v-if="review.reviewString" class="review-div-background review-string-background">
        <p class="pre-wrap mb-0" :class="{ 'truncate-overflow' : this.truncate}">{{review.reviewString}}</p>
        <a role="button" v-if="showMore" @click="toggleTruncate()" class="font-italic show-more d-block mt-1">{{show_hide_text}}</a>
    </div>
</template>

<script>
export default {
    props: ['review'],
    name: 'Review',
    data() {
        return { 
            showMore: false,
            truncate: false,
            show_hide_text: "Show More"
        }
    },
    methods: {
        toggleTruncate: function () {
            this.truncate = !this.truncate;
            this.show_hide_text = (this.show_hide_text == "Show More") ? "Show Less" : "Show More";
        },
        truncateCheck: function () {
            if (this.review.reviewString && this.review.reviewString.split(/\r\n|\r|\n/).length > 3) {
                this.showMore = true;
                this.truncate = true;
            }
        }
    },
     mounted() {
       this.truncateCheck()
     }
}
</script>

<style scoped>

    .truncate-overflow {
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .show-more {
        text-decoration: underline;
        cursor: pointer;
    }

</style>