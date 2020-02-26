import hello from '@demo/hello'

console.log(hello('brian'))

class Foo {
	constructor() {
		this.bar()
	}
	bar() {
		throw new Error('this is a demo')
	}
}

function recursive(count: number = 3) {
	console.log(count)
	if (count == 0) new Foo()
	recursive(count - 1)
}

recursive()
