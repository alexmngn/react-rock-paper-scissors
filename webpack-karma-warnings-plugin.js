/*
 * source https://gist.github.com/mvgijssel/d3b121ad50e34c09a124
 *
 * This plugin makes sure karma doesn't run any specs when there's a
 * compilation error in a module by including a module even if the module has errors.
 *
 * Webpack's normal behaviour is to not include modules which have errors,
 * which causes Karma to run all the tests without the failed spec.
 *
 * Some links to where this magic actually happens in Webpack:
 *
 * The module will be removed from the dependency:
 * https://github.com/webpack/webpack/blob/v1.12.14/lib/Compilation.js#L646-L649
 *
 * and dependencies without a module won't be included in the module map:
 * https://github.com/webpack/webpack/blob/v1.12.14/lib/ContextModule.js#L87-L89
 *
 * Setting the module._source to a javascript error is copied from:
 * https://github.com/webpack/webpack/blob/v1.12.14/lib/NormalModule.js#L127
 */
const RawSource = require('webpack-core/lib/RawSource');

function WebpackKarmaWarningsPlugin() {}

WebpackKarmaWarningsPlugin.prototype.apply = function(compiler) {
	compiler.plugin('compilation', (compilation) => {
		compilation.plugin('failed-module', (module) => {
			const moduleErrorMessage = module.error.error.toString();
			const source = `throw new Error('${moduleErrorMessage}');`;
			module._source = new RawSource(source);
			module.error = null;
		});
	});
};

module.exports = WebpackKarmaWarningsPlugin;
