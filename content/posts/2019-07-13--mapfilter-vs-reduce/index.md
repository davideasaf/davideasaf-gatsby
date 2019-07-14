---
title: JS .reduce() vs .map() + .filter()
description: When filtering and changing a colleciton at the same time, is chaining filter() + map() faster than using reduce()? This post goes into detail on how reduce is the efficient choice. 
category: "general"
cover: nathan-dumlao-eksqjXTLpak-unsplash.jpg
author: David Asaf
---

When writing code, I often feel faced with the decision to either write clean and readable code, or less readable but more performant code. Now I understand, the two or by no means exclusive, but it sometimes feels this way. 

The JS array functions that always make me feel like I'm writing clean and declarative code are the `.map()`, `.filter()`, and `.forEach()` functions. I love these functions because not only are they explicit by their own names, but you can chain them and follow very clearly what is going on with a certain collection. 

```javascript
collection // Imagine an array of objects
  .filter(c => c.isValidName) // filter out invalid names 
  .map(c => c.name) // get the names only
```

When I first started web development in 2015, I remember hearing about the `.reduce()` function for arrays in JS and frankly, I had no idea how to use it. It wasn't until much later around 2017 that I started actually realizing the power of the reduce function. The only problem is that when I wrote a function using `.reduce()` I often had reviewers asking me more questions about what was happening <strong>INSIDE</strong> the reduce function. 

This naturally leads me to the question:

_"should I use multiple iterative functions to complete my end goal, or use the .reduce() function and have all my logic within there?"_

Hypothesis: It's simple. `.reduce()` is absolutely the better choice because it only iterates through a list once while chaining multiple array iterative functions loops through an array `n` number of times where `n` is the number of chained iterative functions. 

So I set out to prove it with the codesandbox below.


<iframe src="https://codesandbox.io/embed/map-filter-vs-reduce-fm3x9?autoresize=1&expanddevtools=1&fontsize=12&module=%2Fsrc%2Fiterative-compare.test.ts&previewwindow=tests" title="map-filter-vs-reduce" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width: 88vw; height: 80vh; transform: translate(-16vw, 0vh); border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

For the most part, my hypothesis was correct. `.reduce()` is without a doubt faster ~94% of the time. But we're talking about 1/100th of a millisecond faster for the most part. Of course, once the size of the collection becomes larger, then this 1/100th of a millisecond can turn into multiple milliseconds. 

Unless you're dealing with incredibly large collections on the front end (which may be a design problem) I'd argue that chaining array functions like  `.map()` + `.filter()` isn't a bad choice. These functions are very straightforward and are very declarative in their use case. If you decide to use `.reduce()`, make sure to use well-named variables and show clear intent within the function. For example, you could create separate functions to help be more declarative. 

```javascript

const isValidName = (c) => c.isValidName
const getName = (c) => c.name

collection.reduce((validNames, c) => {
  if (isValidName(c)) {
    validNames.push(getName(c))
  }
  return validNames
}, [])

```

I understand the above example is simple, but using functions to help give your code clarity like this is extremely helpful for not only readability but also writing tests for your code. 

Hope this helps you gain insight on how to choose your next array function!
