> WWIT (When was it) is a tiny library that tells you how much time has passed from the current time in a humanized form

1 KB _(minified & gzipped)_, one file, and no dependencies.

## Install

```
$ npm i wwit
```

## Usage

```js
const wwit = require("wwit");

const humanizedDifference = wwit(new Date(), {
	format: "short",
	startUnit: "s"
});

console.log(humanizedDifference);
//=> `less than a sec ago`
```

With long `format`, it would be:

```js
const wwit = require("wwit");

const humanizedDifference = wwi(new Date(), {
	format: "short",
	startUnit: "s"
});

console.log(humanizedDifference);
//=> `less than a second ago`
```

## API

### wwit(date, [options], [now])

#### date

Type: `Date`

#### options

Type: `Object`

##### format

Type: `string`<br>
Default: `short`

##### startUnit

Type: `string`<br>
Default: `s`
Possible Values
`s` : Seconds
`min` : Minutes
`h` : Hours
`d` : Days
`mon` : Months
`y` : Years

#### now

Type: `Date`

## Maintainers

- [Diljit VJ](https://github.com/diljitvj)

## License

MIT
