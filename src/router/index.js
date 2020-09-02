import Vue from 'vue'
import VueRouter from 'vue-router'
import EntryList from "../components/EntryList";
import UserRegister from "../components/UserRegister";
import UserLogin from "../components/UserLogin";
import UserRecover from "../components/UserRecover";
import UserProfile from "../components/UserProfile";
import firebase from "../firebase";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'entries',
      component: EntryList,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
      meta: {
        publico: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
      meta: {
        publico: true
      }
    },
    {
      path: '/recover',
      name: 'recover',
      component: UserRecover,
      meta: {
        publico: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: {
        privado: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const privado = to.matched.some(destination => destination.meta.privado === true);
  const publico = to.matched.some(destination => destination.meta.publico === true);
  const currentUser = firebase.auth.currentUser;

  if(privado && !currentUser) {
    console.info("authentication is required");
    next('/login');
  }else if(publico && currentUser) {
    console.info("Path for anonymous users");
    next('/');
  } else if(privado && currentUser) {
    console.info( "Authentication established");
    next();
  } else {
    console.info( "Other possible combinations");
    next();
  }
});

export default router
