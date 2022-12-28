### Coding guidelines

Please talk before doing.

#### Following rules have to be strictly followed
- do not try to show off. If I can not understand your code, even when documented, I won't merge it.
- no tabs, use spaces
- import/export
  - use appropriately index.ts files to export
- code has to pass Lint
  - if you want to change .eslintrc: convince me
  - ```lerna run lint``` will do the job
  - if you use eslint-disable, explain why (comment)
- Tests:
  - Untested code will not get merged.
  - use ```npm run test-local``` to perform the tests
  - use ```npm run test-coverage``` to check code coverage. Coverage should remain close to 100%.

#### Following are personal preferences and it would be nice if you follow them. If you don't: no problem.
- define class properties as class properties, not in the constructor
- initialize class properties in the constructor, not when defining them
- imports
  - are ordered and grouped by 'distance'
    - node_modules
    - own modules '../../../xx' before '../../xx' before '../xx' before './'
    - constants
  - do not import from '.'. In that case reference the file.
  - logically group imports.
- indent = 2 spaces
- I am using VS Code#s `//#region` and `//#endregion`. Please use them also and group class members in a logical way.

---
