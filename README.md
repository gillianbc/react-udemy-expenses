# Part 2 of React Udemy Course
https://www.udemy.com/course/react-2nd-edition
Tutor: Andrew Mead

# Running the App
npm install

npm run dev-server

## Client-Side Routing
![image](https://user-images.githubusercontent.com/20191662/104244536-8039e600-545a-11eb-831f-6329bf53e7cb.png)

To enable React to handle our routing rather than server-side routing, we have to tell it to serve up index.html for all pages or we'll get a 404.
We do that in webpack-config.js via `historyApiFallback`
```
devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
}
```
