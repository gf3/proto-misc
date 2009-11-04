(function() {
  Element.addMethods('FORM', {
    /**
     * Form#populate(data [, shouldCreate]) -> Self
     * - data (Object | Hash | String): Data to populate the form with. Can be
     * either an object, hash, or a string in the format of a query string.
     * - shouldCreate (Boolean): If `true`, elements in the hash that don't 
     * exist in the form will be created. Otherwise they are ignored.
     * 
     * The opposite of serialization, populates a form from an Object, Hash, 
     * or String. It can correctly handle arrays and nested objects in terms 
     * of HTML form naming conventions. Example uses: restoring a serialized 
     * form, quickly creating and populating forms dynamically, etc...
     *
     * <h5>Examples</h5>
     *
     *     // Quick post to server
     *     (new Element('form', {method: 'post', action: '/save'})).populate({some: 'data'}, true).submit();
     *
     *     // Deserialize some data?
     *     Form.populate('warrior-form', {
     *         warrior: {
     *             name: 'Thor',
     *             weapons: ['Hammer', 'Battle Axe', 'Shield'],
     *             family: {
     *                 father: 'Odin',
     *                 mother: 'Jörd',
     *                 wife: 'Sif'
     *             }
     *         }
     *     });
    **/
    populate: function(form, data, shouldCreate) {
      // Extend
      form = $(form);
      
      // Convert
      if (data instanceof String) data = data.toQueryParams();
      else if (data instanceof Hash) data = data.toObject();
      if (Object.prototype.toString !== data.toString) return;
      
      // Populate!
      recursivelyPopulate(form, data, '', shouldCreate);
      
      // Return
      return form;
    }
  });
  
  function updateOrCreate(form, element, value, shouldCreate) {
    var elements = form.getInputs(null, element), el_length = elements.length;;
    
    // Fill form
    if (el_length == 0) {
      // Possibly create?
      if (shouldCreate) {
        if (value instanceof Array && element.substr(-2) == '[]')
          for (var i = 0, length = value.length; i < length; i++)
            form.insert(new Element('input', {type: 'hidden', name: element, value: value[i].toString()}));
        else
          form.insert(new Element('input', {type: 'hidden', name: element, value: value.toString()}));
      }
    }
    else {
      // Change value
      if (value instanceof Array && element.substr(-2) == '[]') {
        // Populate current elements
        for (var i = 0, length = elements.length; i < length; i++)
          elements[i].setValue((value[i] || elements[i].getValue()).toString());
        // Any extras?
        if (shouldCreate && value.length > elements.length)
          for (var i = 0, length = value.length - el_length; i < length; i++)
            form.insert(new Element('input', {type: 'hidden', name: element, value: value[el_length + i].toString()}));
      }
      else elements[0].setValue(value.toString());
    }
  }
  
  function recursivelyPopulate(form, data, builder, shouldCreate) {
    for (var i in data) {
      if (data[i] instanceof Array)
        updateOrCreate(form, i + '[]', data[i], shouldCreate);
      else if (Object.prototype.toString === data[i].toString)
        recursivelyPopulate(form, data[i], (builder.blank() ? i : builder + '[' + i + ']'), shouldCreate);
      else
        updateOrCreate(form, (builder.blank() ? i : builder + '[' + i + ']'), data[i], shouldCreate);
    }
  }
})();