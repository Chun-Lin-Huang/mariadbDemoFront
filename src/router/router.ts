import { createRouter, createWebHistory } from 'vue-router';
import Reservation from '../views/App.tsx';
import  MultiDayBooking  from '../views/MultiDayBooking.tsx';

const routes = [
  { path: '/', component: Reservation },
  { path: '/multi-day', component: MultiDayBooking },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
