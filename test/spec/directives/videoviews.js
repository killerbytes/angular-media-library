'use strict';

describe('Directive: videoViews', function () {

  // load the directive's module
  beforeEach(module('mediaLibraryWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<video-views></video-views>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the videoViews directive');
  }));
});
