# Red Velvet
------------

Simple CLI for generating a base scaffolding for react/redux/react-router components.

_This is based on the new architecture_


TODO: fill this out
```
npm install -g ...
```


To see a list of commands and options
```
red-velvet --help
```

To bake a new cupcake
```
red-velvet create FEATURE_NAME
```
_replace_ **FEATURE_NAME** _with whatever name you want it to be_

This will create a few folder named **FEATURE_NAME** and will have the following files:
- actionTypes.js
- actionCreators.js
- reducer.js
- model.js
- [NAME]Container.js

*Everywhere [NAME] appears will be replaced by the FEATURE_NAME*


This was influenced by the following projects:

https://github.com/thisandagain/generator
https://github.com/jaschaephraim/static-generator
