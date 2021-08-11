<template>
  <Button class="plus-one p-button p-button-rounded">{{text}}</Button>
</template>

<script>
export default {
    props:{
        text:String
    }
};
</script>
<style scoped>
*{
    font-weight: 500;
    font-size: 1.2em;
}
</style>