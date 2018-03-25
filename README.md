# enabler
 ✋ Accessibility analyzer for your frontend.

[<img src="https://badge.fury.io/js/enabler.svg" alt="npm version" >](https://badge.fury.io/js/enabler)
[<img src="https://img.shields.io/npm/dm/enabler.svg" alt="npm downloads" >]("https://npmjs.org/enabler)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)

It's just a node.js util which analyzes your templates all over the project and warns you about potential accessibility problems.

Enabler’s aim is to give developer ability to increase accessibility in development stage, but not after publishing site/application to production.

## Up & Running:

```
> npm i --save-dev enabler


package.json

...
scripts: {
  "a11y": 'enabler --path ./templates-root-folder'
}
...


> npm run a11y

```

## Options:
```
    -V, --version   output the version number
    -P, --path <s>  Path for your root components folder
    --ng            Detect angular abstractions
    --vue           Support vue.js files
    -h, --help      output usage information
 ```


## LICENSE

MIT
