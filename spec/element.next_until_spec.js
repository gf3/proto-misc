Screw.Unit(function() {
  describe ("Element#nextUntil", function() {
   
    it ("should return items three and four in the list", function() {
      var start = $('start');
      var elements = start.nextUntil('li.five');
      expect(elements.length).to(equal, 2);
      expect(elements[0].hasClassName('three')).to(equal, true);
      expect(elements[1].hasClassName('four')).to(equal, true);
    });
    
  });
});