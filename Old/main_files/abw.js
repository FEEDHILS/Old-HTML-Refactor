

/*------------------------------------------------------------------------
 * url_params()
 * 
 * Parse any parameters specified with the URL.
 *------------------------------------------------------------------------*/

function url_params() {
	var url = window.document.URL.toString();
    var params = new Array;

    if (url.indexOf('?') > 0) {
        var args = url.split('?')[1].split('&');
		for (var i = 0; i < args.length; i++) {
			var tokens = args[i].split("=");
            params[tokens[0]] = tokens[1].length
                              ? unescape(tokens[1]) : '';
		}
	}

    return params;
}


/*------------------------------------------------------------------------
 * hint(title, about, direction, caption)
 * 
 * Display a hint panel
 *------------------------------------------------------------------------*/

function hint(title, about, dir, caption) {
    document.getElementById("hint_panel").style.display = 'block';
    document.getElementById("hint_caption").innerHTML = caption;
    document.getElementById("hint_title").innerHTML = title;
    document.getElementById("hint_info").innerHTML = about;
}


/*------------------------------------------------------------------------
 * unhint()
 * 
 * Hide the hint panel
 *------------------------------------------------------------------------*/

function unhint() {
    document.getElementById("hint_panel").style.display = 'none';
}


/*------------------------------------------------------------------------
 * hint_xxx()
 * 
 * Various wrappers around the hint() function
 *------------------------------------------------------------------------*/

function hint_prev(title, about) {
    hint(title, about, 'prev', 'Previous Page');
    document.getElementById("hint_control").className = 'control prev';
}

function hint_next(title, about) {
    hint(title, about, 'next', 'Next Page');
    document.getElementById("hint_control").className = 'control next';
}

function hint_link(title, about) {
    hint(title, about, 'link', 'Goto Page');
    document.getElementById("hint_control").className = 'control';
}

function hint_up(title, about) {
    hint(title, about, 'up', 'Parent Page');
    document.getElementById("hint_control").className = 'control up';
}

function hint_here(title, about) {
    hint(title, about, 'this', 'Current Page');
    document.getElementById("hint_control").className = 'control here';
}

function hint_action(title, about) {
    hint(title, about, 'action', 'Control');
    document.getElementById("hint_control").className = 'control action';
}

function hint_panel() {
    hint_action( 'Open/Close Panel', 
                 'Click panel header to show/hide the panel content' );
}

function hint_section() {
    hint_action( 'Show/Hide Section', 
                 'Click section title to toggle content on/off.')
}

function hint_subsection() {
    hint_action( 'Show/Hide Sub-Section', 
                 'Click sub-section title to toggle content on/off.')
}



/*------------------------------------------------------------------------
 * switch_tag_class(root, tag, from, to)
 * 
 * Switch all tag elements under the root from one class to another.
 *------------------------------------------------------------------------*/

function switch_tag_class(root, tag, cfrom, cto) {
  var nodes = root.getElementsByTagName(tag);
  var n, node;
 
  for (n = 0; (node = nodes[n]); n++) {
    if (node.className == cfrom) {
      node.className = cto;
    }
  }
}
  
function shut_all(root) {
  if (! root) root = document;
  switch_tag_class(root, 'div', 'section', 'shut section');
  switch_tag_class(root, 'div', 'subsection', 'shut subsection');
  switch_tag_class(root, 'div', 'open section', 'shut section');
  switch_tag_class(root, 'div', 'open subsection', 'shut subsection');
  switch_tag_class(root, 'div', 'wedged section', 'open section');
  switch_tag_class(root, 'div', 'wedged subsection', 'open subsection');
  return false;
}

function open_all(root) {
  if (! root) root = document;
  switch_tag_class(root, 'div', 'section', 'open section');
  switch_tag_class(root, 'div', 'subsection', 'open subsection');
  switch_tag_class(root, 'div', 'shut section', 'open section');
  switch_tag_class(root, 'div', 'shut subsection', 'open subsection');
  switch_tag_class(root, 'div', 'wedged section', 'open section');
  switch_tag_class(root, 'div', 'wedged subsection', 'open subsection');
  return false;
}

function open_section(name) { 
   var section = document.getElementById(name);
   section.className = 'open section';
//   open_all(section);
}


function show_compander(root) {
  if (! root) root = document;
  switch_tag_class(root, 'div', 'inactive compander', 'active compander');
}

/*------------------------------------------------------------------------
 * switch_element(node, class)
 * 
 * Toggle the node's className between "open $class" and "shut $class"
 *------------------------------------------------------------------------*/

function switch_element(node, classname) { 
    node.className =
    node.className == 'open ' + classname
                    ? 'shut ' + classname
                    : 'open ' + classname;
    return false;
}

function switch_panel(panel) { 
  panel.className = 
  panel.className == 'panel'
    ? 'collapsed panel'
    : 'panel';
  return false;
}

function switch_minipanel(panel) { 
  panel.className = 
  panel.className == 'mini panel'
    ? 'collapsed mini panel'
    : 'mini panel';
  return false;
}

function switch_section(section) { 
  section.className =
  section.className == 'section stub'
    ? 'open section'
    : 'section stub';
  return false;
}


function switch_subsection(subsect) { 
  subsect.className = 
  subsect.className == 'subsection stub'
    ? 'open subsection'
    : 'subsection stub';
  return false;
}


function find(parent, tag, classname) {
  var nodes = parent.getElementsByTagName(tag);
  var n, node;
 
  for (n = 0; (node = nodes[n]); n++) {
    if (node.className == classname)
      break;
  }
  return node;
}


function expand_all(root) {
  if (! root) root = document;
  switch_tag_class(root, 'div', 'section stub', 'open section');
  switch_tag_class(root, 'div', 'subsection stub', 'open subsection');
  return false;
}


function expand_html(link) {
    var div = (link.parentNode.getElementsByTagName('div'))[0];
    if (div) {
        div.style.display = 'block';
        link.onclick = function() { return collapse_html(this) };
    }
    else
        load_html(link);
    return false;
}

function expand_xml(link) {
    var div = (link.parentNode.getElementsByTagName('div'))[0];
    if (div) {
        div.style.display = 'block';
        link.onclick = function() { return collapse_xml(this) };
    }
    else
        load_xml(link);
    return false;
}


function collapse_html(link) {
    var cont = (link.parentNode.getElementsByTagName('div'))[0];
    if (cont) {
        cont.style.display = 'none';
        link.onclick = function() { return expand_html(this) };
    }
    return false;
}

function collapse_xml(link) {
    var cont = (link.parentNode.getElementsByTagName('div'))[0];
    if (cont) {
        cont.style.display = 'none';
        link.onclick = function() { return expand_xml(this) };
    }
    return false;
}


/*------------------------------------------------------------------------
 * get_style()
 * 
 * Returns the title of the current active stylesheet.
 *------------------------------------------------------------------------*/

function get_style() {
  var elems = document.getElementsByTagName("link");
  var n, elem, title;

  for (n = 0; (elem = elems[n]); n++) {
     if (elem.getAttribute("rel").indexOf("style") != -1 
     && (title = elem.getAttribute("title"))
     && !elem.disabled)
       return title;
  }
  return null;
}


/*------------------------------------------------------------------------
 * set_style(title)
 * 
 * Set the active stylesheet by enabling the <link rel="style" ...> 
 * element that has a title attribute matching the title argument,
 * and disabling all others.
 *------------------------------------------------------------------------*/

function set_style(title) {
  var elems = document.getElementsByTagName("link");
  var n, elem, tattr;

  for (n = 0; n < elems.length; n++) {
    elem = elems[n];

    if (elem.getAttribute("rel").indexOf("style") != -1 
    && (tattr = elem.getAttribute("title"))) {
      elem.disabled = true;
      if (tattr == title) 
        elem.disabled = false;
    }
  }
}


/*------------------------------------------------------------------------
 * set_cookie(name, value, days)
 * 
 * Set a cookie with the name and value passed as the first two arguments, 
 * set to expire in the number of days specified in the third argument.
 *------------------------------------------------------------------------*/

function set_cookie(name, value, days) {
  var expires;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
  }
  else 
    expires = "";

  document.cookie = name + "=" + value + expires + "; path=/";
}


/*------------------------------------------------------------------------
 * get_cookie(name)
 * 
 * Returns the value of the cookie identified by the name argument.
 *------------------------------------------------------------------------*/

function get_cookie(name) {
  var namestr  = name + "=";
  var cookbits = document.cookie.split(';');
  var n;

  for(n = 0; n < cookbits.length; n++) {
    var c = cookbits[n];

    /* remove leading whitespace */
    while (c.charAt(0) == ' ') 
      c = c.substring(1, c.length);

    /* if the name start this cookie fragment, return the value */
    if (c.indexOf(namestr) == 0) 
      return c.substring(namestr.length, c.length);
  }
  return null;
}

function unabout() {
}

/*------------------------------------------------------------------------
 * hide_menu()
 * 
 * Set the stylesheet to 'Hide Menu'
 *------------------------------------------------------------------------*/

function hide_menu() {
  unabout();
  set_style('Hide Menu');
  return false;
}


/*------------------------------------------------------------------------
 * show_menu()
 * 
 * Set the stylesheet to 'Show Menu'
 *------------------------------------------------------------------------*/

function show_menu() {
  unabout();
  set_style('Default Style');
  return false;
}


function clear_link(name) {
  document.getElementById(name).href = '#';
}


function preload_images() {
var image1 = new Image();
image1.src = "/images/abwlogo/abw_orange_190x70.png";
var image2 = new Image();
image2.src = "/images/icons/medium/abw.gif";
var image3 = new Image();
image3.src = "/images/icons/medium/badger.gif";
var image4 = new Image();
image4.src = "/images/icons/medium/camel.gif";
var image5 = new Image();
image5.src = "/images/icons/medium/computer.gif";
var image6 = new Image();
image6.src = "/images/icons/medium/kite.gif";
var image7 = new Image();
image7.src = "/images/icons/medium/mboard.gif";
var image8 = new Image();
image8.src = "/images/icons/medium/tt2.gif";
var image9 = new Image();
image9.src = "/images/icons/medium/cool.gif";
var image10 = new Image();
image10.src = "/images/ui/roll_button.gif";
var image11 = new Image();
image11.src = "/images/ui/roll_panel.gif";
var image12 = new Image();
image12.src = "/images/ui/roll_header.gif";
var image13 = new Image();
image13.src = "/images/ui/roll_collapsed.gif";
var image14 = new Image();
image14.src = "/images/ui/roll_header20.gif";
var image15 = new Image();
image15.src = "/images/ui/roll_collapsed20.gif";
var image16 = new Image();
image16.src = "/images/arrows/ff24_orange/right.gif";
var image17 = new Image();
image17.src = "/images/arrows/ff24_orange/dotplus.gif";
var image18 = new Image();
image18.src = "/images/arrows/ff16_orange/up.gif";
var image19 = new Image();
image19.src = "/images/arrows/ff16_orange/right.gif";
var image20 = new Image();
image20.src = "/images/arrows/ff16_orange/dotminus.gif";
var image21 = new Image();
image21.src = "/images/arrows/ff16_orange/dotplus.gif";
var image22 = new Image();
image22.src = "/images/arrows/ee16_orange/right.gif";
var image23 = new Image();
image23.src = "/images/arrows/ee16_orange/right.gif";
var image24 = new Image();
image24.src = "/images/arrows/ee16_orange/left.gif";
var image25 = new Image();
image25.src = "/images/arrows/ee16_orange/dotplus.gif";
var image26 = new Image();
image26.src = "/images/arrows/ee16_orange/dotminus.gif";
var image27 = new Image();
image27.src = "/images/arrows/dd16_orange/right.gif";
var image28 = new Image();
image28.src = "/images/arrows/dd16_orange/dotplus.gif";
var image29 = new Image();
image29.src = "/images/arrows/dd16_orange/dotminus.gif";
var image30 = new Image();
image30.src = "/images/arrows/dd16_blue/dotminus.gif";
var image31 = new Image();
image31.src = "/images/misc/tickroll.gif";
var image32 = new Image();
image32.src = "/images/misc/extlinkroll.gif";
}



/*------------------------------------------------------------------------
 * define onload and onunload event handlers for the window that use 
 * a cookie to store the user's preferred stylesheet
 *------------------------------------------------------------------------*/


window.onload = function(e) { 
    open_all();
}

window.onunload = function(e) { 
  /* set a cookie to remember the stylesheet for next time */
  var style;
  if ((style = get_style())) 
    set_cookie("stylesheet", style, 365);
}

/* set style */
var style;
if ((style = get_cookie("stylesheet"))) 
  set_style(style);

preload_images();
