---
title: JS .reduce() vs .map() + .filter()
description: When filtering and changing a colleciton at the same time, is chaining filter() + map() faster than using reduce()? This post goes into detail on how reduce is the efficient choice.
category: 'javascript'
cover: nathan-dumlao-eksqjXTLpak-unsplash.jpg
author: David Asaf
---

_Edit: 07/29/19 - Added a walkthrough + TL;DR_

**TL;DR: Write for clarity. While `.reduce()` is much faster than running multiple chain methods, code clarity and readability should be considered better than speed in this case. If a `.map()` + `.filter()` chain is clearer than writing a large `.reduce()` function, then use the former. On the other hand, if you're truly reducing a list of items to 1 value, then a `.reduce()` function is much clearer (e.g. adding an array of numbers)**

## Introduction

When writing code, I often feel faced with the decision to either write clean and readable code, or less readable but more performant code. Now I understand, the two or by no means exclusive, but it sometimes feels this way.

The JS array functions that always make me feel like I'm writing clean and declarative code are the `.map()`, `.filter()`, and `.forEach()` functions. I love these functions because not only are they explicit by their names, but you can chain them and follow very clearly what is going on with a certain collection.

```javascript
collection // Imagine an array of objects
  .filter(c => c.isValidName) // filter out invalid names
  .map(c => c.name); // get the names only
```

When I first started web development in 2015, I remember hearing about the `.reduce()` function for JS arrays and frankly, I had no idea how to use it. It wasn't until much later that I **started** actually realizing the power of the reduce function. The only problem is that when I wrote a function using `.reduce()` I often had reviewers asking me more questions about what was happening <strong>INSIDE</strong> the reduce function.

This naturally led me to the question:

_"should I use multiple chainable Array functions, or use the .reduce() function and have all my logic within there?"_

## Hypothesis

It's simple. `.reduce()` is absolutely the better choice because it only iterates through a list once while chaining multiple array iterative functions loops through an array `n` number of times where `n` is the number of chained iterative functions.

So I set out to prove it (see code sandbox below for interactive code).

[![Edit map-filter-vs-reduce](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/map-filter-vs-reduce-fm3x9?fontsize=14)

## Walkthrough

I'll be doing my test using TypeScipt. The first thing to create is an interface for the objects we will hold in our test collections.

```typescript
interface ISampleObject {
  id: number;
  name: string;
}
```

1 test will:

1. Iterate over `1000` `ISampleObject`s
2. Filter out all `ISampleObject`s that have an `id <= 50`.
3. Take only the `name` value and return an array of name values

For each one of the above tests, I will record whether using a `.filter()` + `.map()` method works faster or a `.reduce()` method works faster. I will run the above test `100` times and record the number of test winds each method has.

With the plan above, Let's create a function that implements the `.filter()` + `.map()` and returns the amount of time it took to execute the method.

```typescript
const runFilterAndMapTest = (collection: ISampleObject[]): number => {
  const filterAndMapTestStart = performance.now();

  collection.filter(sampleObj => sampleObj.id > 50).map(sampleObj => sampleObj.name);

  const filterAndMapTestEnd = performance.now();

  return filterAndMapTestEnd - filterAndMapTestStart;
};
```

and then the `.reduce()` method.

```typescript
const runReduceTest = (collection: ISampleObject[]): number => {
  const reduceStart = performance.now();

  collection.reduce((acc, sampleObj) => {
    if (sampleObj.id > 50) {
      acc.push(sampleObj.name);
    }
    return acc;
  }, []);

  const reduceEnd = performance.now();

  return reduceEnd - reduceStart;
};
```

Now that we have functions to run our 2 array manipulation methods, let's set up some infrastructure for the test.

Let's start with our constants.

```typescript
/* CONSTANTS
 */
// size of collection the loops that filter+map
// and reduce will use
const COLLECTION_LENGTH = 1000;
// size of test case.
const TEST_ITERATIONS = 100;
// To see details for every iteration
const VERBOSE = false;
```

and let's write a function to build a collection of `ISampleObject`s

```typescript
const getSingleCollection = (collectionLength: number): ISampleObject[] =>
  Array.from({ length: collectionLength }, (_, k) => ({
    id: k + 1,
    name: `name of ${k + 1}`
  }));
```

This function is creating an array that is the length of the provided `collectionLength` variable with `ISampleObject`s that have an incremented id and name.

To wrap it all up, we write our final test function to run the tests. We will use the variable `filterAndMapWinCount` to keep track of the number of times `.filter()` + `.map()` are faster than `.reduce()`.

```typescript
/*
Test that runs multiple iterations for
filter+map and reduce
*/
let filterAndMapWinCount = 0;
for (let i = 0; i <= TEST_ITERATIONS; i++) {
  const collection = getSingleCollection(COLLECTION_LENGTH);

  const filterAndMapTime = runFilterAndMapTest(collection);
  const reduceTime = runReduceTest(collection);

  if (VERBOSE) {
    console.log(`filterAndMap took ${filterAndMapTime} milliseconds.`);
    console.log(`Reduce took ${reduceTime} milliseconds.`);
    console.log(`The winner is ${filterAndMapTime > reduceTime ? 'FilterAndMap' : 'Reduce'}!`);
    console.log('---------------------------------------------------------');
  }

  if (filterAndMapTime < reduceTime) {
    filterAndMapWinCount++;
  }
}
```

and to easily reveal the winner as a percentage of wins:

```typescript
console.log(`AVG filterAndMap % win rate: ${(filterAndMapWinCount / TEST_ITERATIONS) * 100}`);

console.log(`AVG Reduce % win rate: ${((TEST_ITERATIONS - filterAndMapWinCount) / TEST_ITERATIONS) * 100}`);
```

## Conclusion

For the most part, my hypothesis was correct. `.reduce()` is without a doubt faster ~94% of the time. But we're talking about 1/100th of a millisecond faster for the most part. Of course, once the size of the collection becomes larger, then this 1/100th of a millisecond can turn into multiple milliseconds.

Unless you're dealing with incredibly large collections on the front end (which may be a design problem) I'd argue that chaining array functions like `.map()` + `.filter()` isn't a bad choice. These functions are very straightforward and are very declarative in their use case. If you decide to use `.reduce()`, make sure to use well-named variables and show clear intent within the function. For example, you could create separate functions to help be more declarative.

```javascript
const isValidName = c => c.isValidName;
const getName = c => c.name;

collection.reduce((validNames, c) => {
  if (isValidName(c)) {
    validNames.push(getName(c));
  }
  return validNames;
}, []);
```

I understand the above example is simple, but using functions to help give your code clarity like this is extremely helpful for not only readability but also writing tests for your code.

Hope this helps you gain insight on how to choose your next array function!
