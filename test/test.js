var assert = chai.assert;

describe('load test', function() {

	it('should has on function', function() {
		assert.equal(true, 'on' in $);
	})

	it('should has trigger function', function() {
		assert.equal(true, 'trigger' in $);
	})

	it('should has css function', function() {
		assert.equal(true, 'css' in $('div'));
	})	

	it('should select node object', function() {
		assert.equal('[object HTMLDivElement]', Object.prototype.toString.call($('div')) );
	})
})

describe('event test', function() {
	
	it('could trigger custom event', function() {
		var el = $('div'),
			_t = 'triggered',
			_r;

		el.on('custom event', function() {
			_r = _t;
		})
		el.trigger('custom event');
		assert.equal(_r, _t);
	})

})