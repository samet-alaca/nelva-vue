import Vue from 'vue';
import Router from 'vue-router';

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
			name: 'members',
			path: '/members',
			component: () => import('@/views/Members')
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
		}
	]
});
