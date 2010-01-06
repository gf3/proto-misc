// Bookmarklet
// javascript:(function(input){input%20=%20input.toLowerCase();var%20method_type,splitForDocs%20=%20function(str,%20token)%20{var%20pos;if%20((pos%20=%20str.lastIndexOf(token))%20<%200)%20return%20[str];else%20return%20[str.substring(0,%20pos).split(token).join(%22/%22),%20str.substr(pos+1)];},base_url%20=%20%27http://api.prototypejs.org/%27,shortcuts%20=%20{%27$%27:%20%27dom/dollar%27,%27$$%27:%20%27dom/dollardollar%27,%27$f%27:%20%27dom/dollarf%27,%27$a%27:%20%27language/dollara%27,%27$h%27:%20%27language/dollarh%27,%27$r%27:%20%27language/dollarr%27,%27$w%27:%20%27language/dollarw%27,%27document.viewport%27:%20%27dom/document/viewport%27},sections%20=%20{%27ajax%27:%20[%27ajax%27],%27dom%27:%20[%27dollar%27,%27dollardollar%27,%27dollarf%27,%27abstract%27,%27element%27,%27form%27,%27selector%27,%27document%27,%27document/viewport%27],%27language%27:%20[%27dollara%27,%27dollarh%27,%27dollarr%27,%27dollarw%27,%27array%27,%27class%27,%27enumerable%27,%27function%27,%27hash%27,%27number%27,%27object%27,%27objectrange%27,%27periodicalexecutor%27,%27regexp%27,%27string%27,%27template%27,%27try%27]},parts%20=%20/#/.test(input)%20?%20(method_type%20=%20%27instance_method%27)%20&&%20splitForDocs(input,%20%27#%27)%20:%20(method_type%20=%20%27class_method%27)%20&&%20splitForDocs(input,%20%27.%27);if%20(input%20in%20shortcuts)%20window.location.assign(base_url%20+%20shortcuts[input]%20+%20%27.html%27);for%20(var%20section%20in%20sections)%20{var%20i%20=%20sections[section].length;while%20(--i)%20{if%20(parts[0]%20==%20sections[section][i])%20window.location.assign(base_url%20+%20section%20+%20%27/%27%20+%20parts[0]%20+%20%27.html%27%20+%20(parts.length%20==%202%20?%20%27#%27%20+%20parts[1]%20+%20%27-%27%20+%20method_type%20:%20%27%27));}}})(prompt(%27Prototype%20API%27));

// Full Code
(function(input){
  // Misc init
  input = input.toLowerCase();
  var method_type,
      splitForDocs = function(str, token) {
        var pos;
        if ((pos = str.lastIndexOf(token)) < 0) return [str];
        else return [str.substring(0, pos).split(token).join("/"), str.substr(pos+1)];
      },
      base_url = 'http://api.prototypejs.org/',
      shortcuts = {
        '$':  'dom/dollar',
        '$$': 'dom/dollardollar',
        '$f': 'dom/dollarf',
        '$a': 'language/dollara',
        '$h': 'language/dollarh',
        '$r': 'language/dollarr',
        '$w': 'language/dollarw',
        'document.viewport': 'dom/document/viewport'
      },
      sections  = {
        'ajax': [
          'ajax'
        ],
        'dom': [
          'dollar',
          'dollardollar',
          'dollarf',
          'abstract',
          'element',
          'form',
          'selector',
          'document',
          'document/viewport'
        ],
        'language': [
          'dollara',
          'dollarh',
          'dollarr',
          'dollarw',
          'array',
          'class',
          'enumerable',
          'function',
          'hash',
          'number',
          'object',
          'objectrange',
          'periodicalexecutor',
          'regexp',
          'string',
          'template',
          'try'
        ]
      },
      parts = /#/.test(input) ? (method_type = 'instance_method') && splitForDocs(input, '#') : (method_type = 'class_method') && splitForDocs(input, '.');
  
  // Shortcut
  if (input in shortcuts) window.location.assign(base_url + shortcuts[input] + '.html');
  // Full
  for (var section in sections) {
    var i = sections[section].length;
    while (--i) {
     if (parts[0] == sections[section][i]) window.location.assign(base_url + section + '/' + parts[0] + '.html' + (parts.length == 2 ? '#' + parts[1] + '-' + method_type : ''));
    }
  }
})(prompt('Prototype API'));
