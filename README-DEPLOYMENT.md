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

(Note - I used the lecture 133 branch by mistake for the CSS work)

For production, this works well as it tells us the original CSS file eg.datepicker.css
For development, we just get one styles.css file - it hasn't given us complete soure maps for the css as we're using `devtool: "eval-cheap-module-source-map",`
So, we change to `devtool: inline-source-map` for development - slow to build and refresh when changed, but easy to follow.
In Andrew's version, he also has to set an source map option for css-loader and sass-loader, but I don't need to do this according to the latest css-loader documentation: 
https://github.com/webpack-contrib/css-loader.
https://github.com/webpack-contrib/sass-loader
"By default generation of source maps depends on the devtool option. All values enable source map generation except eval and false value."

# Express Server
Added a little express server `server/server.js` to serve up the contents of public.
`node server/server.js`
Remember that when we served up using webpack devServer, we instructed it to fallback to index.html for any 404 page not found via `historyApiFallback`.
```
devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
  },
```
We need to do the same thing with the express server to avoid e.g.: `Cannot GET /create`
```
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
```

# Deploying to Heroku
Use the heroku cli.  https://devcenter.heroku.com/articles/heroku-cli

This is easier on mac rather than a windows shell.

Make sure you're in your project folder and that the folder is in git

`heroku --version`

`heroku login`  Use my gszemeti@gmail.com plus the password from my keychain.

`heroku create react-expensify-gbc`  If you don't supply an application name, it will assign a random name for you.

```
https://react-expensify-gbc.herokuapp.com/ | https://git.heroku.com/react-expensify-gbc.git
```

When the app has been created, it will have added an extra remote to your git.

Do `git remote -v` to see the details.

```
heroku	https://git.heroku.com/react-expensify-gbc.git (fetch)
heroku	https://git.heroku.com/react-expensify-gbc.git (push)
origin	https://github.com/gillianbc/react-udemy-expenses.git (fetch)
origin	https://github.com/gillianbc/react-udemy-expenses.git (push)
```
By default, heroku will try to run the `start` script in `package.json`.  
We want it to run our express server so make sure you have:

`"start": "node server/server.js",`

For our local express server, `server.js`, it's fine to use port 3000, but on heroku, the port number is dynamic.
We can access the port number that heroku assigns via:

`const port = process.env.PORT || 3000;`

If it's not set, we fallback to 3000 for running locally.

We must not check in all build assets (bundle.js etc) to git - heroku must build them fresh using webpack.
To get heroku to use webpack, we need another `package.json` script that runs our production build script:

`"heroku-postbuild": "npm run build-prod"`

Working with my local git and branches is just the same as before.  To update heroku, use the master branch:

`git push heroku master`

*Note:*  heroku will use yarn if you have a yarn.lock, otherwise it will look for a package-lock.json to install all of the node-modules.
(I had switched from yarn to npm so I deleted my yarn.lock in branch `Sec13-DEPLOYING-YOUR-APP-Lec136-Deploying-with-Heroku`).

The first time you push to heroku, be patient, it will take a while.
Your package.lock.json must be in sync with your package.json.
If you have issues, do `heroku logs`

# Dev and Production Dependencies
Heroku will ignore dev dependencies, so make sure things like ensyme and jest are in the dev dependencies section
We no longer need live-server as we have webpack's dev-server for dev and our express server for production. 
(Removed live-server in branch 137)

We can also tidy up the public folder so that everything that the production server needs is under a `public/dist` folder
rather than being in separate files:

![image](https://user-images.githubusercontent.com/20191662/112690314-79284e80-8e73-11eb-89d6-a205a9ca4866.png)

When we use webpack's dev-server, we don't get a bundle.js under public (it all happens in memory), but it does need to 
know where our assets are e.g. images.  https://webpack.js.org/configuration/dev-server/

`contentBase: path.join(__dirname, "public")`

We can access the in-memory bundle.js by default on http://localhost:8080/bundle.js.  We can set this to `dist` too:

https://webpack.js.org/configuration/dev-server/#devserverpublicpath-

`publicPath: '/dist/'`

