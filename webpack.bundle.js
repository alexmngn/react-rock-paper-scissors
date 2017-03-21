// webpack collects all spec files, looking into subfolders recursively
// the result will be a single bundle importing all specs as the input for Karma

function load(modules) {
	modules.keys().forEach(function(path){
		modules(path);
	});
}

load(require.context('./src', true, /\.spec\.js$/));
