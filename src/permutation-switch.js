(function () {
  'use strict';

  /**
   * <ANY permutation-switch="{foo: true}"></ANY>
   *
   * This provides an expression to be evaluated by child predicate permutations
   */
  function PermutationSwitchDirective ($parse) {
    return {
      restrict: 'AE',
      require: 'permutationSwitch',
      priority: 500,
      controller: ['$scope', function NgPermutationSwitchCtrl () {
        this.permutations = [];

        this.addPermutation = function (permutation) {
          this.permutations.push(permutation);
        };
      }],
      link: function (scope, element, attrs, permutationSwitchController) {
        var watchExpression = attrs.permutationSwitch || attrs.on,
            selectedPermutations = [];

        // re-evaluate which transclusions to display when the main expression changes
        scope.$watch(watchExpression, function permutationSwitchWatchAction (value) {
          var selectedPermutation;

          // destroy existing transcluded scopes and elements
          while (selectedPermutations.length > 0) {
            selectedPermutation = selectedPermutations.pop();
            selectedPermutation.scope.$destroy();
            selectedPermutation.element.remove();
          }

          // examine each child predicate and transclude the ones that come out truthy
          angular.forEach(permutationSwitchController.permutations, function (selectedTransclude) {
            var predicate = $parse(selectedTransclude.expression)(scope);

            // only object maps are allowed
            if (!angular.isObject(predicate)) {
              return;
            }

            // if any inequalites are found in the predicate, do not transclude
            for (var key in predicate) {
              if (value[key] !== predicate[key]) {
                return;
              }
            }

            // predicate passes, transclude the element, render it, and store reference for teardown
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

  /**
   * <ANY permutation-switch-when="{foo: false}"></ANY>
   *
   * This is used to provide a predicate to evaluate against the `permuation-switch` expression
   */
  function PermutationSwitchWhenDirective () {
    return {
      restrict: 'AE',
      require: '^permutationSwitch',
      transclude: 'element',
      priority: 500,
      link: function (scope, element, attrs, ctrl, $transclude) {
        // add to the collection of permutations
        ctrl.addPermutation({element: element, transclude: $transclude, expression: attrs.permutationSwitchWhen});
      }
    };
  }

  angular.module('ngPermutationSwitch', [])
  .directive('permutationSwitch', ['$parse', PermutationSwitchDirective])
  .directive('permutationSwitchWhen', [PermutationSwitchWhenDirective]);
}).call(this);
