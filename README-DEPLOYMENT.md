# Section 13 Deployment

This section was about producing a dev build and a production build

Run the build script.  `"build": "webpack"`
This shows that the bundle is huge:
```
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  bundle.js (3.94 MiB)
```
A lot of this bloat is detailed source-maps, which we don't necessarily need in production.
https://webpack.js.org/guides/production/

In the course, Andrew's using webpack 3.1.0, but mine is 5.11.1 so I went with webpack's current documentation.

`npm install --save-dev webpack-merge`

We can then replace webpack.config.js into 3 parts:

* webpack-common.js
* webpack-dev.js
* webpack-prod.js

Both the dev and prod configs import the common config.  
For production, the build does not include the dev server and more basic source maps.
The bundle size is much smaller.

The dev and prod configs set `process.env.NODE_ENV` to either `development` or `production`

The package.json scripts now use either the dev or production config:

```
    "start": "webpack serve --open --config webpack.dev.js",
    "build-dev": "webpack --config webpack.dev.js",
    "build-prod": "webpack --config webpack.prod.js",
```
NB `--open` means open the browser once served

Note that our `start` script will do a dev build and serve it up.  
If we want to serve up the production build, we need to run the production build to get our `bundle.js` and then serve it up
using our old friend live-server

`"serve": "live-server public/",`

## Source Maps
To check that the source maps are still working in production, just serve up the app and F12 to see the console and you should see the links adjacent to any console log statement
e.g.

![image](https://user-images.githubusercontent.com/20191662/112053926-dc04a780-8b4c-11eb-8a9c-f3954e036ab0.png)

## CSS Single File
Andrew used extract-text-webpack-plugin but I think that's old hat now as webpack's documentation used `mini-css-extract-plugin`
I followed webpack's instructions here:

https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file

We want all our css (dev and prod) to end up in a single file called `styles.css`

![image](https://user-images.githubusercontent.com/20191662/112059963-75838780-8b54-11eb-90c8-ab1364e2b9dc.png)

Previously, we had 3 loaders:
```
{
  test: /\.s?css$/,
  use: ["style-loader", "css-loader", "sass-loader"],
},
```
We're not going to be using inline styles anymore, so style-loader can go, but we do need the other two loaders.

![image](https://user-images.githubusercontent.com/20191662/112059670-09a11f00-8b54-11eb-9187-e300967da541.png)

Now we need to make our application use this all-in-one `styles.css` file so we add it to our `index.html`
Note the path is relative to where in app is being served from i.e. public

```
<link rel="stylesheet" type="text/css" href="/styles.css"/>
```
We can see the styles at runtime via the Network tab - CSS.  You can also use right-click inspect.  

For production, this works well as it tells us the original CSS file eg.datepicker.css
For development, we just get one styles.css file - it hasn't given us complete soure maps for the css as we're using `devtool: "eval-cheap-module-source-map",`
So, we change to `devtool: inline-source-map` for development - slow to build and refresh when changed, but easy to follow.
In Andrew's version, he also has to set an source map option for css-loader and sass-loader, but I don't need to do this according to the latest css-loader documentation: 
https://github.com/webpack-contrib/css-loader.
https://github.com/webpack-contrib/sass-loader
"By default generation of source maps depends on the devtool option. All values enable source map generation except eval and false value."



