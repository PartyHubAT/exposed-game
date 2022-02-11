import { createRouter, createWebHashHistory } from "vue-router";
import LoadingScreen from "../views/LoadingScreen.vue";
import GamePanel from "../views/GamePanel.vue";
import Results from "../views/Results.vue";

const routes = [
  {
    path: "/",
    name: "LoadingScreen",
    component: LoadingScreen,
  },
  {
    path: "/exposed",
    name: "GamePanel",
    component: GamePanel,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
