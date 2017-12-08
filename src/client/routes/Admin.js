import universal from 'react-universal-component';

import Routes from './Client';
import AdminContainer from '../components/Admin/AdminContainer';

const Dashboard = universal(() =>
	import(`../components/Admin/Dashboard/Dashboard`)
);
const Pages = universal(() => import(`../components/Admin/Pages/PageList`));
const Posts = universal(() => import(`../components/Admin/Posts/PostList`));
const Menus = universal(() => import(`../components/Admin/Menus/MenuList`));
const Categories = universal(() =>
	import(`../components/Admin/Categories/CategoryList`)
);
const Galleries = universal(() =>
	import(`../components/Admin/Galleries/GalleryList`)
);
const Users = universal(() => import(`../components/Admin/Users/UserList`));

export default () => {
	let arr = [];
	Routes.map(route => {
		arr.push(route);
	});
	arr[0].routes.splice(arr[0].routes.length - 1, 0, {
		component: AdminContainer,
		path: '/admin',
		routes: [
			{
				name: 'Dashboard',
				icon: 'glyphicon glyphicon-blackboard',
				component: Dashboard,
				path: '/admin/dashboard'
			},
			{
				name: 'Pages',
				icon: 'glyphicon glyphicon-blackboard',
				path: '/admin/pages',
				component: Pages,
				sub: [
					{
						name: 'Create Page',
						path: '/admin/pages/create',
						component: './Pages/CreatePage'
					},
					{
						name: 'Edit Page',
						path: '/admin/pages/edit/:id',
						component: './Pages/PageList'
					}
				]
			},
			{
				name: 'Posts',
				icon: 'glyphicon glyphicon-pushpin',
				path: '/admin/posts',
				component: Posts,
				sub: [
					{
						name: 'Create Post',
						path: '/admin/posts/create',
						component: './Posts/CreatePost'
					},
					{
						name: 'Edit Post',
						path: '/admin/posts/edit/:id',
						component: './Posts/PostList'
					}
				]
			},
			{
				name: 'Menus',
				icon: 'glyphicon glyphicon-th-list',
				path: '/admin/menus',
				component: Menus
			},
			{
				name: 'Categories',
				icon: 'glyphicon glyphicon-tags',
				path: '/admin/categories',
				component: Categories
			},
			{
				name: 'Galleries',
				icon: 'glyphicon glyphicon-camera',
				path: '/admin/galleries',
				component: Galleries
			},
			{
				name: 'Users',
				icon: 'glyphicon glyphicon-user',
				path: '/admin/users',
				component: Users
			}
		]
	});
	return arr;
};
