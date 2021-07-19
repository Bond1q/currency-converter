export const removeCurrency = (c) => {
	const list = ['clf', 'cnh', 'mru', 'std', 'ves', 'ecs']
	for (let key in c) {
		if (list.includes(key)) {
			delete c[key]
		}
		if (c[key] === 'Bosnia-Herzegovina Convertible Mark') {
			c[key] = 'Bosnia-Herzegovina Mark'
		}
	}

	return c
}