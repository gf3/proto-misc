// A Proto-port of [jquery.nextUntil.js](http://github.com/cowboy/jquery-misc/blob/master/jquery.ba-nextUntil.js) by [Ben Alman](http://benalman.com/).

Element.addMethods({
  /**
   * Element#nextUntil(expr) -> Array
   * - expr (String): A css expression that matches the element to stop at.
   *
   * Will include all the of the siblings after a given element until one of
   * them matches the CSS expression.
   *
   * <h5>Examples</h5>
   *
   *     <ul>
   *         <li class="one">One</li>
   *         <li class="two" id="start">Two</li>
   *         <li class="three">Three</li>
   *         <li class="four">Four</li>
   *     </ul>
   *     ...
   *     $('start').nextUntil('li.four');
   *     // -> [<li class="three">Three</li>]
  **/
  nextUntil: function(element, expr) {
    var sibs = [];
    
    $(element).nextSiblings().each(function(el){
      if (el.match(expr)) throw $break;
      else sibs.push(el);
    });
    
    return sibs;
  }
});