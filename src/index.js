const path = require('path')
const fs = require('fs')

function stat(file) {
	try {
		return fs.statSync(file)
	} catch(err) {
		return null
	}
}

function transform(t, nodePath, file) {
	if(nodePath.node.specifiers.length > 0) {
		return
	}

	let importPath = nodePath.node.source.value

	if(importPath.indexOf('/') < 0) {
		return
	}

	const name = path.basename(importPath)

	if(name.indexOf('.') >= 0) {
		return
	}

	if(file.opts.autoresolve) {
		const dirname = path.dirname(path.resolve(process.cwd(), file.file.opts.filename))

		let stats = stat(path.resolve(dirname, importPath))

		if(!stats) {
			stats = stat(path.resolve(dirname, importPath) + '.js')

			if(stats) {
				importPath += '.js'
			}
		} else if(stats.isDirectory()) {
			stats = stat(path.resolve(dirname, importPath, './index.js'))

			if(stats) {
				importPath += '/index.js'
			}
		}
	}

	nodePath.replaceWith(
		t.importDeclaration(
			[ t.importSpecifier(t.identifier(name), t.identifier(name)) ],
			t.stringLiteral(importPath)
		)
	)
}

module.exports = babel => ({
	visitor: {
		ImportDeclaration: (nodePath, file) => transform(babel.types, nodePath, file)
	}
})
