<template>
    <div class="main">
        <canvas id="flame" ref="canvas"></canvas>
    </div>
</template>

<script>
    import 'raf.js';
    import Ctx from 'src/assets/ctx';

    export default {
        data () {
            return {

            };
        },
        computed: {
            ctx () {
                return Ctx(this.$refs.canvas, '2d');
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.init();
            });
        },
        methods: {
            init () {
                this.resetSize();
            },
            resetSize () {
                let ctx = this.ctx;
                let winWidth = this.winWidth = window.innerWidth;
                let winHeight = this.winHeight = window.innerHeight;
                this.$refs.canvas.width = winWidth;
                this.$refs.canvas.height = winHeight;
            }
        }
    };
</script>

<style lang="scss">
    @import 'src/assets/base';
</style>
