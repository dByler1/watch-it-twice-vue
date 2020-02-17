<template>
<div>

        <!-- <div class="alert alert-warning alert-dismissible fade show" role="alert">
            {{ this.msg }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div> -->


    <div v-if="success_msg" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ success_msg }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <div v-if="error_msg" class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ error_msg }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>


    <div v-for="error in errors" :key="error" class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ error }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>
  
</template>

<script>
export default {
    name: "Messages",
    props: ['errors', 'error_msg', 'success_msg'],
    // data () {
    //     return {
    //         errors: [],
    //         error_msg: "",
    //         success_msg: ""
    //     }
    // }
}
</script>

<style>

</style>