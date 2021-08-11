<template>
  <Chip class="m-1" :label="category"/>
</template>

<script>
export default {
    props:{
        category:String
    }
}
</script>

<style>
.p-chip-text{
    font-size:0.8em;
    line-height:1.2em !important;
    font-weight:700;
}
</style>
