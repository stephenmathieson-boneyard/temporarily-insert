
var assert = require('component/assert');
var contains = require('component/within-document');
var temporarily = require('/');

describe('temporarily-insert', function() {
  var el;

  beforeEach(function() {
    el = document.createElement('div');
  });

  it('should add `el` to the document', function(done) {
    temporarily(el, function() {
      assert(contains(el));
      done();
    });
  });

  it('should hide `el`', function() {
    temporarily(el, function() {
      var parent = el.parentNode;
      assert('hidden' == parent.style.visibility);
    });
  });

  it('should remove `el` from the document when fn is done', function() {
    temporarily(el, function(){});
    assert(!contains(el));
  });

  describe('when `el` is attached', function() {
    var fixture;

    beforeEach(function() {
      fixture = document.createElement('div');
      document.body.appendChild(fixture);
      fixture.appendChild(el);
    });

    it('should move `el`', function() {
      temporarily(el, function() {
        assert(fixture != el.parentNode);
      });
    });

    describe('after moving', function() {
      it('should put `el` back', function() {
        temporarily(el, function(){});
        assert(el == fixture.childNodes[0]);
      });
    });
  });
});
