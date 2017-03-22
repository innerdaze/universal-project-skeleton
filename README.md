# Hej

## Tricks

### Simplifying Output

Many of the provided npm scripts produce hierarchical output which can make tracking down the appropriate error difficult. In most cases where a step fails in the process the output will contain 2 error stacks: one you're interested in and the NPM error letting your know the parent script failed.

In order to simplify the output, use your bash skills to redirect the error output from NPM away from your precious field of view.

For example:
```sh
-> npm run start:dev 2>/dev/null
```
