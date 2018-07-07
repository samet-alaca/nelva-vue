import Vue from 'vue';
import Router from 'vue-router';
import { CHECK_AUTH } from '@/store/actions.type';
import store from '@/store'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('@/views/Home')
		},
		{
			name: 'join',
			path: '/join',
			component: () => import('@/views/Join')
		},
		{
			name: 'users',
			path: '/users',
			component: () => import('@/views/Users'),
			beforeEnter: (to, from, next) => {
				store.dispatch(CHECK_AUTH).then(next).catch((error) => {
					throw error;
				});
			}
		},
		{
			name: 'user',
			path: '/users/:id',
			component: () => import('@/views/User'),
			beforeEnter: (to, from, next) => {
				store.dispatch(CHECK_AUTH).then(next).catch((error) => {
					throw error;
				});
			}
		},
		{
			name: 'academy',
			path: '/academy',
			component: () => import('@/views/Academy')
		},
		{
			name: 'nexus',
			path: '/nexus',
			component: () => import('@/views/Nexus')
		},
		{
			name: 'cinelva',
			path: '/cinelva',
			component: () => import('@/views/Cinelva')
		},
		{
			name: 'chronicles',
			path: '/chronicles',
			component: () => import('@/views/Chronicles')
		},
		{
			name: 'admin',
			path: '/admin',
			component: () => import('@/views/Admin')
		},
		{
			name: 'login',
			path: '/login',
			component: () => import('@/views/Login')
		}
	]
});
