require('babel-register')

const gulp = require('gulp')
const createBlueKit = require('react-bluekit/lib/createBlueKit').default

createBlueKit({
  // your directory where components are located
  baseDir: `${__dirname}/client`,
  // relative paths from base dir where to look for components
  paths: ['./components/', './auth'],
  // relative paths from base dir of files or directories you want to exclude from indexing
  exclude: [],
  // set to true when providing simple components such as `export default function MyComponent() { <div>Hello</div> }`
  noSpecialReplacements: true
});

gulp.task('default', ['build-bluekit', 'watch-bluekit'])
