/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/10.
 */

import Vue from "vue";
import axios from "axios";
import qs from "querystring";
import addPatient from "../../../components/patientConsult/addPatient.vue"
Vue.prototype.$http=axios;

class Consult {
    constructor() {

    }
    init (){
        new Vue({
            el: "#patientConfult",
            data(){
                return {}
            },
            components: {
                "add-patient": addPatient
            }
        });
    }
}

let consult=new Consult();
consult.init();