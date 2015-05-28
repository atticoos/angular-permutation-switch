(function () {
  'use strict';
  function PermutationSwitchDirective ($parse) {
    return {
      restrict: 'AE',
      require: 'permutationSwitch',
      priority: 1200,
      controller: ['$scope', function NgPermutationSwitchCtrl () {
        this.permutations = [];

        this.addPermutation = function (permutation) {
          this.permutations.push(permutation);
        };
      }],
      link: function (scope, element, attrs, permutationSwitchController) {
        var watchExpression = attrs.permutationSwitch || attrs.on,
            selectedPermutations = [];

        scope.$watch(watchExpression, function permutationSwitchWatchAction (value) {
          var selectedPermutation;
          while (selectedPermutations.length > 0) {
            selectedPermutation = selectedPermutations.pop();
            selectedPermutation.scope.$destroy();
            selectedPermutation.element.remove();
          }

          angular.forEach(permutationSwitchController.permutations, function (selectedTransclude) {
            var permutation = $parse(selectedTransclude.expression)(scope);
            for (var key in permutation) {
              if (value[key] !== permutation[key]) {
                return;
              }
            }

            selectedTransclude.transclude(function (permutationElement, selectedScope) {
              selectedPermutations.push({
                element: permutationElement,
                scope: selectedScope
              });
              element.append(permutationElement);
            });
          });
        });
      }
    };
  }

  function PermutationSwitchWhenDirective () {
    return {
      restrict: 'AE',
      require: '^permutationSwitch',
      transclude: 'element',
      priority: 1200,
      link: function (scope, element, attrs, ctrl, $transclude) {
        ctrl.addPermutation({element: element, transclude: $transclude, expression: attrs.permutationSwitchWhen});
      }
    };
  }

  angular.module('ngPermutationSwitch', [])
  .directive('permutationSwitch', ['$parse', PermutationSwitchDirective])
  .directive('permutationSwitchWhen', [PermutationSwitchWhenDirective]);
}).call(this);
