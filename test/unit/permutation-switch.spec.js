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

  describe ('basic permutations', function () {
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.one = true;
      scope.two = true;
      element = $compile([
        '<div permutation-switch="{foo: one, bar: two}">',
        '  <div permutation-switch-when="{foo: true, bar: true}">First</div>',
        '  <div permutation-switch-when="{foo: true, bar: false}">Second</div>',
        '  <div permutation-switch-when="{foo: false, bar: true}">Third</div>',
        '  <div permutation-switch-when="{foo: false, bar: false}">Fourth</div>',
        '</div>'
      ].join('\n'))(scope);
      scope.$apply();
    }));
    it ('should show the element if the case is satisfied and hide the others', function () {
      expect(getPermutations().eq(0).text()).to.equal('First');
      expect(getPermutations().eq(1).length).to.equal(0);
      expect(getPermutations().eq(2).length).to.equal(0);
      expect(getPermutations().eq(3).length).to.equal(0);
    });
    it ('should reflect the proper case when the premise changes', function () {
      // true, true
      expect(getPermutations().eq(0).text()).to.equal('First');
      expect(getPermutations().eq(1).length).to.equal(0);

      // true, false
      scope.two = false;
      scope.$apply();
      expect(getPermutations().eq(0).text()).to.equal('Second');
      expect(getPermutations().eq(1).length).to.equal(0);

      // false, true
      scope.one = false;
      scope.two = true;
      scope.$apply();
      expect(getPermutations().eq(0).text()).to.equal('Third');
      expect(getPermutations().eq(1).length).to.equal(0);

      // false, false
      scope.two = false;
      scope.$apply();
      expect(getPermutations().eq(0).text()).to.equal('Fourth');
      expect(getPermutations().eq(1).length).to.equal(0);
    });
  });

  describe('partial permutations', function () {
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.one = true;
      scope.two = true;
      element = $compile([
        '<div permutation-switch="{foo: one, bar: two}">',
        '  <div permutation-switch-when="{foo: true, bar: true}">First</div>',
        '  <div permutation-switch-when="{foo: true, bar: false}">Second</div>',
        '  <div permutation-switch-when="{foo: false, bar: true}">Third</div>',
        '  <div permutation-switch-when="{foo: false, bar: false}">Fourth</div>',
        '  <div permutation-switch-when="{foo: false}">Fifth</div>',
        '  <div permutation-switch-when="{foo: true}">Sixth</div>',
        '  <div permutation-switch-when="{bar: true}">Seventh</div>',
        '  <div permutation-switch-when="{bar: false}">Eighth</div>',
        '</div>'
      ].join('\n'))(scope);
      scope.$apply();
    }));
    it ('should show partial permutations when the case is satisified, and hide the others', function () {
      expect(getPermutations().eq(0).text()).to.equal('First');
      expect(getPermutations().eq(1).text()).to.equal('Sixth');
      expect(getPermutations().eq(2).text()).to.equal('Seventh');
      expect(getPermutations().eq(3).length).to.equal(0);
    });
    it ('should reflect the proper case when the premise changes', function () {
      // true, true
      expect(getPermutations().eq(0).text()).to.equal('First');
      expect(getPermutations().eq(1).text()).to.equal('Sixth');
      expect(getPermutations().eq(2).text()).to.equal('Seventh');
      expect(getPermutations().eq(3).length).to.equal(0);

      // false, true
      scope.one = false;
      scope.$apply();
      expect(getPermutations().eq(0).text()).to.equal('Third');
      expect(getPermutations().eq(1).text()).to.equal('Fifth');
      expect(getPermutations().eq(2).text()).to.equal('Seventh');
      expect(getPermutations().eq(3).length).to.equal(0);

      // false, false
      scope.two = false;
      scope.$apply();
      expect(getPermutations().eq(0).text()).to.equal('Fourth');
      expect(getPermutations().eq(1).text()).to.equal('Fifth');
      expect(getPermutations().eq(2).text()).to.equal('Eighth');
      expect(getPermutations().eq(3).length).to.equal(0);

      // true, false
      scope.one = true;
      scope.$apply();
      expect(getPermutations().eq(0).text()).to.equal('Second');
      expect(getPermutations().eq(1).text()).to.equal('Sixth');
      expect(getPermutations().eq(2).text()).to.equal('Eighth');
      expect(getPermutations().eq(3).length).to.equal(0);
    });
  });
});
