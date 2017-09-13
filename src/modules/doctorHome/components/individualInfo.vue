<template>
    <section class="consult-main-inner">
        <transition name="fade">
            <toast :content="errorMsg" v-if="errorShow"></toast>
        </transition>
        <loading v-show="finish"></loading>
    </section>
</template>
<script type="text/ecmascript-6">
    /**
     * @Desc：
     * @Usage:
     * @Notify：
     * @Depend：
     *
     * Created by jukun on 2017/9/11.
     */

    import selectArea from 'components/selectArea';
    import api from 'common/js/util/util';
    import loading from 'components/loading';
    import toast from 'components/toast';
    import autosize from 'autosize';
    import axios from "axios";
    import confirm from 'components/confirm';

    const XHRList = {
        upload: "",
        create: "",
        triage: ""
    };
    export default {
        data() {
            return {
              errorShow:false,
              finish:false
            }
        },
        activated() {

        },
        mounted() {

        },
        methods: {},
        components: {
            loading,
            toast,
            confirm
        },
    }


</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../../../../scss/library/_common-modules";

</style>
