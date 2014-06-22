jest.dontMock('../qin.js');
describe('test', function() {
 it('adds 1 + 2 to equal 3', function() {
   var sum = function(a,b){
   	return a+b;
   }
   expect(sum(1, 2)).toBe(3);
 });
});