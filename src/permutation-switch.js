'use strict';

var MODULE_NAME = 'ngPermutationSwitch';

function PermutationSwitchDirective () {
  return {
    restrict: 'AE',
    controller: [function NgPermutationSwitchCtrl () {
      this.permutations = [];
    }],
    link: function (scope, element, attrs) {
      var watchExpression = attrs.permutationSwitch || attrs.on;

      scope.$watch(watchExpression, function permutationSwitchWatchAction (value) {

      });
    }
  };
}

function PermutationSwitchWhenDirective () {
  return {
    restrict: 'AE',
    require: '^permutationSwitch',
    transclude: 'element',
    link: function (scope, element, attrs, ctrl, $transclude) {
      ctrl.addPermutation({element: element, transclude: $transclude, expression: attrs.permutationSwitchWhen});
    }
  };
}

angular.module('NgPermutationSwitch', [])
.directive('permutationSwitch', [PermutationSwitchWhenDirective])
.directive('permtuationSwitchWhen', [PermutationSwitchWhenDirective]);
