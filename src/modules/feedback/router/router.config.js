import feedback from "../components/feedback.vue";
export default {
  routes: [
    {
      path:"*",
      redirect:"/feedback"
    },
    {
      path:"/feedback",
      name:"feedback",
      component:Feedback
    },
  ]
};
