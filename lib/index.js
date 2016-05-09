const path = require('path');

module.exports = function(babel) {
	var t = babel.types;

	return {
		visitor: {
			ImportDeclaration: function(nodePath, file) {
				if(nodePath.node.specifiers.length > 0) {
					return;
				}

				const importPath = nodePath.node.source.value;

				if(importPath.indexOf('/') < 0) {
					return;
				}

				const name = path.basename(importPath);

				if(name.indexOf('.') >= 0) {
					return;
				}

				nodePath.replaceWith(
					t.importDeclaration(
						[ t.importSpecifier(t.identifier(name), t.identifier(name)) ],
						t.stringLiteral(nodePath.node.source.value)
					)
				);
			}
		}
	};
};
