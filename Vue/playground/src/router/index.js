import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import ProfileRoute from "../views/ProfileRoute.vue";
import LoginRoute from "../views/LoginRoute.vue";
import RegisterRoute from "../views/RegisterRoute.vue";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: ProfileRoute
    },
    {
      path: "/login",
      component: LoginRoute
    },
    {
      path: "/register",
      component: RegisterRoute
    }
  ]
})

// Routing:
// 1. install vue-router
// 2. make a directory named "router" - create an index.js
// 3. make a directory named "views" 
// 4. create your routes inside "views" as .vue files - import and add ur components to template
// *5. use "createRouter" in index.js - add the createWebHistory() function to the "history"
// 6. create ur routes (array of objects)
// 7. route object: 
// {
//    path, component
// }
// 8. in main - create a variable from createapp() - remove mount() method and add it seperately
// 9. before mount() - add use() method to the variable - pass the router to use() 
// 10. in app.vue add a component named <RouterView /> - its like outlet in react
// *11. use "RouterLink" to nagivate between routes
// *12. with "useRoute" you can get current route path
// *13. add a not found: set the path to '/:catchAll(.*)' and add your component