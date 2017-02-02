import test from 'ava'
import { transformFile } from 'babel-core'
import path from 'path'
import plugin from '../src'

function transformFixture(fixture, callback) {
	return new Promise((resolve, reject) => {
		transformFile(path.join(__dirname, 'fixtures', fixture), {
			presets: [ 'es2016-node5' ],
			plugins: [ plugin ]
		}, (err, result) => {
			if(err) {
				return reject(err)
			}

			resolve(result.code)
		})
	})
}

test('import', it => {
	return transformFixture('test.js').then(code => {
		it.is(code, '\'use strict\';\n\nvar _a = require(\'./a\');')
	})
})
