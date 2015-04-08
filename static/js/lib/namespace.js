// This file provides the default namespaces for the Jive JavaScript Library

/*globals jive console */

var HOSTURL = "/";
var AJAXPATH = "";

if (typeof(jive) == "undefined") {
    jive = {};
}

/**
 * jive.namespace(name[, obj = {}]) -> obj
 * - name (String): New namespace to create under `jive`.
 *
 * Creates a new namespace under `jive` and returns it.  If the given
 * namespace is already defined returns the existing value.
 *
 * The name of the new namespace may contain dots (.) in which case nested
 * namespaces are conditionally created for each component of the name.
 **/
jive.namespace = function(name, obj) {
    var parts = name.split('.'),
        space = this,
        i;
    for (i = 0; i < parts.length; i += 1) {
        if (typeof(space[parts[i]]) === 'undefined') {
            if (i == parts.length - 1 && typeof(obj) != 'undefined') {
                space[parts[i]] = obj;
            } else {
                space[parts[i]] = {};
            }
        }
        space = space[parts[i]];
    }
    return space;
};

jive.namespace('gui');
jive.namespace('model');
jive.namespace('ext.y');
jive.namespace('ext.x');
jive.namespace('xml');
jive.namespace('rte.macros', []);
jive.namespace('rte.plugin');
jive.namespace('global');

// Create stubs for logging functions in case some debugging statements are
// left in.
jive.namespace.call(window, 'console.log',   function() {});
jive.namespace.call(window, 'console.debug', function() {});
jive.namespace.call(window, 'console.error', function() {});
jive.namespace.call(window, 'console.warn',  function() {});
jive.namespace.call(window, 'console.info',  function() {});

/*
try{
    var win = window.open("",name,"width=450,height=700,scrollbars=1,resize=1");
    win.document.write("<html><head><title>History</title>" +
    "<style>ol{padding-left: 12px;} div{ font-family:verdana;font-size:8pt; margin-bottom:10px; }</style>" +
    "</head><body>");
    win.document.write("</body></html>");
    win.document.close();

    var arrayHolder = win.document.createElement('DIV');
    win.document.body.appendChild(arrayHolder);
    var arrayList = win.document.createElement('OL');
    arrayHolder.appendChild(arrayList);

    var log = win.document.createElement('DIV');
    win.document.body.appendChild(log);
    console = new Object();
    console.log = function(str){
        log.appendChild(win.document.createTextNode(str));
        log.appendChild(win.document.createElement('BR'));
        log.appendChild(win.document.createElement('BR'));
    };
}catch(e){ }
*/
