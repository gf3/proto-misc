Screw.Unit(function() {
  describe("Form#populate", function() {
    var form;
    
    before(function(){
      form = new Element('form', {action: '#', method: 'post'});
      form.insert(new Element('input', {type: 'text', name: 'lol[]', value: 'one', id: 'lol_one'}));
      form.insert(new Element('input', {type: 'text', name: 'lol[]', value: 'two', id: 'lol_two'}));
      form.insert(new Element('input', {type: 'hidden', name: 'lmfao', value: 'single', id: 'lmfao'}));
      form.insert(new Element('input', {type: 'text', name: 'user[name]', value: 'jeff', id: 'user_name'}));
      $('dom_test').update(form);
    });
    
    // shouldCreate FALSE
    describe("when `shouldCreate` is false", function(){
      it("should populate from a simple object", function() {
        form.populate({lmfao: 'hehe'});
        expect($F('lmfao')).to(equal, 'hehe');
      });
      
      it("should ignore form elements that aren't present", function() {
        form.populate({what: "hehe"});
        var hiddens = form.getInputs('hidden');
        expect(hiddens.length).to(equal, 1);
        expect(hiddens[0].identify()).to(equal, 'lmfao');
      });
      
      it("should correctly populate form arrays", function() {
        form.populate({lol: ['woo', 'hoo']});
        expect($F('lol_one')).to(equal, 'woo');
        expect($F('lol_two')).to(equal, 'hoo');
      });
      
      it("should correctly populate nested objects", function() {
        form.populate({user: {name: 'Ralph'}});
        expect($F('user_name')).to(equal, 'Ralph');
      });
    });
    
    // shouldCreate TRUE
    describe("when `shouldCreate` is true", function(){
      it("should populate from a simple object", function() {
        form.populate({lmfao: 'hehe', create: 'me'}, true);
        expect($F('lmfao')).to(equal, 'hehe');
        
        var search = form.getInputs(null, 'create');
        expect(search.length).to(equal, 1);
        expect(search[0].getValue()).to(equal, 'me');
      });
      
      it("should correctly populate form arrays", function() {
        form.populate({lawl: ['woo', 'hoo']}, true);
        
        var search = form.getInputs(null, 'lawl[]');
        expect(search.length).to(equal, 2);
        expect(search[0].getValue()).to(equal, 'woo');
        expect(search[1].getValue()).to(equal, 'hoo');
      });
      
      it("should correctly populate nested objects", function() {
        form.populate({user: {role: 'Officer'}}, true);
        
        var search = form.getInputs(null, 'user[role]');
        expect(search.length).to(equal, 1);
        expect(search[0].getValue()).to(equal, 'Officer');
      });
      
      it("should first prefill available elements, then create any remaining elements", function(){
        form.populate({lol: ['woo', 'hoo', 'ha']}, true);
        expect($F('lol_one')).to(equal, 'woo');
        expect($F('lol_two')).to(equal, 'hoo');
        
        var search = form.getInputs(null, 'lol[]');
        expect(search.length).to(equal, 3);
        expect(search[0].getValue()).to(equal, 'woo');
        expect(search[1].getValue()).to(equal, 'hoo');
        expect(search[2].getValue()).to(equal, 'ha');
      });
    });
    
    it("should try to convert objects to a string before inserting", function(){
      function MyClass(msg) {
        this.toString = function() {
          return msg;
        }
      }
      form.populate({lmfao: new MyClass('lol')});
      expect($F('lmfao')).to(equal, 'lol');
    });
    
  });
});