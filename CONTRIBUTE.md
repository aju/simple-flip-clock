# Requirement

 - gulp 
 
# Contribute

- ES6 + SASS
- use the template: `/components/template`
- testing: `npm test`
- developing: `gulp watch`
- building: `gulp build --production-build`

##### Note: Before commit run `gulp build -- production-build` 

# Version update

Before merging PR use `npm version` on a branch to bump version
More info: [npm-version](https://docs.npmjs.com/cli/version)

# Dependencies

For npm we are using `shrinkwrap` and `shrinkpack`
(You should have shrinkpack installed globally on your development machine)

**How to use:**
After installing module with `npm i --save` (or `--save-dev`) run `npm shrinkwrap --dev` and then `shrinkpack`.
Commit all files from `node_shrinkwrap` to repository.
