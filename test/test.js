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

})