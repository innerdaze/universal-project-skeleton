# Hej

## How to Use

1. Decide what your project will be called. Ours will be called Jeff.

2. Clone this repo (replace "jeff" with your answer from Step 1)
```sh
-> git clone http://git.orbistech.co.uk/lee.driscoll/universal-project-skeleton.git jeff
-> cd jeff
```

3. Create another bare repo on Gitlab (we're going to continue the jeff theme here)

4. Setup your project to point at the new repo
```sh
-> git remote set-url origin http://git.orbistech.co.uk/lee.driscoll/jeff.git
```

5. Install all the things
```sh
-> npm i
```

__Bonus Points__

6. Set the upstream to the original repo
```sh
-> git remote add upstream http://git.orbistech.co.uk/lee.driscoll/universal-project-skeleton.git
```


## Tricks

### Simplifying Output

Many of the provided npm scripts produce hierarchical output which can make tracking down the appropriate error difficult. In most cases where a step fails in the process the output will contain 2 error stacks: one you're interested in and the NPM error letting your know the parent script failed.

In order to simplify the output, use your bash skills to redirect the error output from NPM away from your precious field of view.

For example:
```sh
-> npm run start:dev 2>/dev/null
```
