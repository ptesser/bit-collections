# Bit Collections

## Collections

### Angular

- https://bit.dev/ptesser/ng-ui
- https://bit.dev/ptesser/ng-utils
- https://bit.dev/ptesser/ng-swal
- https://bit.dev/ptesser/ngx-adapter-table

## How to use

### Configure

- `bit init` inside the project
- `bit login`

### Utility

- `bit add <component-name>` for example: `bit add src/app/ui/no-items` and set entry module with `--main=src/app/ui/no-items/no-items.module.ts`. 
If you want to group a set of files in an unique namespace you have to specify the id `--id=no-items`
- `bit tag <component-name>` for example: `bit tag no-items`: improve a component version;
- `bit export <user-name>.<collection-name> <user-name>.<collection-name>/<component-name>` for example `bit export ptesser.ng-ui ptesser.ng-ui/no-items`: load component into a specific collection;
- `bit build <component-name>`: build all components or a specific component;
- `bit show <component-name>`: show all component dependencies and a general overview;

### Useful links

- https://docs.bit.dev/docs/angular-guidelines#add-angular-libraries-as-peer-dependencies-with-relaxed-versions

This link is useful for this kind of errors:

```
NullInjectorError: StaticInjectorError(AppModule)[NgClassImpl -> ElementRef]: 
```


### Compiler

Angular compiler that works in this project is version `0.1.7`.

Run `bit import bit.envs/compilers/angular@0.1.7 --compiler`

Version `0.2.1` generates error:

```
error: bit failed to load bit.envs/compilers/angular@0.2.1 with the following exception:
Cannot find module '/Users/ptesser/Documents/repository/github/personal/bit-collections/ng-collections/.bit/components/compilers/angular/bit.envs/0.2.1/dist/angular/tsconfig.json'.
Error: Cannot find module '/Users/ptesser/Documents/repository/github/personal/bit-collections/ng-collections/.bit/components/compilers/angular/bit.envs/0.2.1/dist/angular/tsconfig.json'
```

Version `0.1.2` generates error:

```
Command failed: node /Users/ptesser/Documents/repository/github/personal/bit-collections/ng-collections/.bit/components/compilers/angular/bit.envs/0.1.2/node_modules/ng-packagr/cli/main.js -p ng-package.json -c tsconfig.json
error TS6046: Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.string', 'es2019.symbol', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint'.


Building Angular Package
```

