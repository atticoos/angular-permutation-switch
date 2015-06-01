# angular-permutation-switch

An enhancement of the principles behind [`ng-switch`](ngSwitch) and [`ng-messages`](ngMessages) to allow for more complex view dynamics based on changing permutations

## Installation

```sh
bower install angular-permutation-switch
```

```js
angular.module('yourModule', ['ngPermutationSwitch']);
```

## The problem it solves

Sometimes your views have to support complex states with many permutations of those states. As of now, there's no good way to support this with out of the box tooling provided by Angular. We have `ng-switch` and `ngMessages`, but they're purposed slightly differently. `ng-switch` focuses on the representation of a single state, and `ng-messages` focuses more on the existence of potentially multiple things, but not all the different values they may hold. Just that they are `truthy`. `permutation-switch` focuses on the possible combination of outcomes of different representations of state.

### New Way

```html
<div permutation-switch="{foo: someComplicatedCondition(), bar: somethingElse() && anotherCondition()}">
  <div permutation-switch-when="{foo: true, bar: true}">Foo is true, bar is true</div>
  <div permutation-switch-when="{foo: false, bar: false}">Foo is false, bar is false</div>
  <div permutation-switch-when="{foo: true, bar: false}">Foo is true, bar is false</div>
  <div permutation-switch-when="{foo: false, bar: true}">Foo is false, bar is true</div>
  <div permutation-switch-when="{foo: true}">Foo is true, doesn't matter what bar is</div>
  <div permutation-switch-when="{bar: false}">Bar is false, doesn't matter what foo is</div>
  ...
</div>
```

### Old Way

```html
<div ng-if="someComplicatedCondition() && somethingElse() && anotherCondition()">
  Foo is true, bar is true
</div>
<div ng-if="!someComplicatedCondition() && !(somethingElse() && anotherCondition())">
  Foo is false, bar is false
</div>
<div ng-if="someComplicatedCondition() && !(somethingElse() && anotherCondition())">
  Foo is true, bar is false
</div>
<div ng-if="!someComplicatedCondition() && somethingElse() && anotherCondition()">
  Foo is false, bar is true
</div>
<div ng-if="someComplicatedCondition()">
  Foo is true, doesn't matter what bar is
</div>
<div ng-if="!(somethingElse() && anotherCondition())">
  Bar is false, doesn't matter what foo is
</div>
```


[ngSwitch]:https://docs.angularjs.org/api/ng/directive/ngSwitch
[ngMessages]:https://docs.angularjs.org/api/ngMessages/directive/ngMessages
