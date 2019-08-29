<template>
    <div class="main">
        <p>vue content!</p>
        <demo-vue></demo-vue>
    </div>
</template>
<script>
import DemoVue from './components/demo.vue';

export default {
    mounted () {
        // console.log('mounted!');
    },
    components: {
        DemoVue
    }
};
</script>
<style lang="scss">
    body {
        background: #ccc;
    }
</style>
