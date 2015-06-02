describe('permutation-switch', function () {
  var element,
      scope;

  beforeEach(module('ngPermutationSwitch'));

  function getPermutations () {
    return element.find('div[permutation-switch-when]');
  }

  describe ('basics', function () {
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.value = true;
      element = $compile([
        '<div permutation-switch="{foo: value}">',
        '  <div permutation-switch-when="{foo: true}">First</div>',
        '  <div permutation-switch-when="{foo: false}">Second</div>',
        '</div>'
      ].join('\n'))(scope);
      scope.$apply();
    }));

    it ('should show the element if the case is satisfied', function () {
      expect(getPermutations().eq(0).text()).to.equal('First');
    });

    it ('should hide the element if the case is not satisfid', function () {
      expect(getPermutations().eq(1).length).to.equal(0);
    });

    it ('should reflect the proper case when the premise changes', function () {
      expect(getPermutations().eq(0).text()).to.equal('First');
      expect(getPermutations().eq(1).length).to.equal(0);
      scope.value = false;
      scope.$apply();
      expect(getPermutations().eq(0).text()).to.equal('Second');
      expect(getPermutations().eq(1).length).to.equal(0);
    });
  });
});
