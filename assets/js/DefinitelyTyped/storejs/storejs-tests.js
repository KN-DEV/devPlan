store.set('username', 'marcus');

var userName = store.get('username');

var all = store.getAll();

store.remove('username');

store.clear();

store.set('user', { name: 'marcus', likes: 'javascript' });

var user = store.get('user');
alert(user.name + ' likes ' + user.likes);
//# sourceMappingURL=storejs-tests.js.map
