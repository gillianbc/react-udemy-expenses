# Section 13 Deployment

Run the build script.  `"build": "webpack"`
This shows that the bundle is huge:
```
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  bundle.js (3.94 MiB)
```
A lot of this bloat is source-maps, which we don't necessarily need in production.
https://webpack.js.org/guides/production/

In the course, Andrew's using webpack 3.1.0, but mine is 5.11.1.