beforeEach(function(){
	let model = new Data();
});

describe("Return id of the last entry", function(){
	it("returns the factors of 16", function(){
		expect(model.getLastId()).toEqual(0);
	});

});

