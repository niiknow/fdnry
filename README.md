# Feedinary javascript sdk

Feedinary client-side code

## Features

* Webpack based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

## Getting started

1. Setting up the name of your library
  * Open `webpack.config.js` file and change the value of `libraryName` variable.
  * Open `package.json` file and change the value of `main` property so it matches the name of your library.
2. Build your library
  * Run `npm install` to get the project's dependencies
  * Run `npm run build` to produce minified version of your library.
3. Development mode
  * Having all the dependencies installed run `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
4. Running the tests
  * Run `npm run test`

## Scripts

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test` - well ... it runs the tests :)

## Logic

### Rendering
* when rendering UI, get production content
* when preview, get saved content
* when edit, get saved content

### Preview
* add query string: fdnmode=preview
* saved content and rendered, must completely reload page

### Edit
* add query string: fdnmode=edit
* saved content are rendered and edit
* all edits are handled by editor.html
* user must be authenticated with the server in order to be in edit mode
* redirect user to authenticate?

### editor.html
* auto-save are done through timer for dirty object
* restore are asked when user edit and provided content is not the same
* when edit
  1.  apply default content if no item (new item)
  2.  cancel to revert to content that was passed in
  3.  save to persist to server
  4.  publish to persist to server and publish content


