module.exports = {
  scripts: {
    sass: {
      build: "node-sass './src/sass/app.scss' './assets/css/app.css' --source-map true",
      watch: "nodemon -e scss -w src/sass -x 'nps sass.build'",
      min: "node-sass './src/sass/app.scss' './assets/css/app.css' && cleancss -o './assets/css/app.min.css' './assets/css/app.css'",
    },
    js: {
      build: "babel src/js/app.js --out-file assets/js/app.bundle.js --source-maps inline",
      watch: "nodemon -e js -w src/js -x 'nps js.build'",
      min: "babel src/js/app.js --out-file assets/js/app.bundle.js && uglifyjs './assets/js/app.bundle.js' -o './assets/js/app.min.js' --mangle",
    },
    browsersync: "browser-sync start --files 'assets' --server --reload-delay 500",
    watch: "nps browsersync & nps js.watch & nps sass.watch",
    production: "nps js.min & nps sass.min",
  },
};
