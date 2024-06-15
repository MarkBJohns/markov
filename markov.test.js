const MarkovMachine = require("./markov");

describe("MarkovMachine()", function () {
    
    describe("Intialization", function () {
        it("should create chains correctly from text inputs", function () {
            const text = "the cat in the hat is in the hat";
            let MM = new MarkovMachine(text);
            
            expect(MM.chains).toEqual({
                the: ['cat', 'hat', 'hat'],
                cat: ['in'],
                in: ['the', 'the'],
                hat: ['is', null],
                is: ['in']
            });
        });
    });
    
    describe("makeText", function () {
        it("should generate random text from the chains", function () {
            const text = "the cat in the hat is in the hat";
            let MM = new MarkovMachine(text);
            
            let result = MM.makeText(20);
            expect(result.split(' ').length).toBeLessThanOrEqual(20);
        });;
    });
});