const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Rheas application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath('assets');

mix.ts('resources/js/app.tsx', 'assets/js').sass('resources/sass/app.scss', 'assets/css');

if (mix.inProduction()) {
    mix.version();
}
