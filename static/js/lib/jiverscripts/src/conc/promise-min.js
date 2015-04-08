jive.conc.Promise=function(){jive.conc.observable(this);var c=false,d=false,e,f,a=this;this.addCallback=function(g){this.addListener("success",g);return this};this.addErrback=function(g){this.addListener("error",g);return this};this.addCancelback=function(g){this.addListener("cancel",g);return this};this.always=function(g){this.addListener("complete",g);return this};this.emitSuccess=function(){var g=Array.prototype.slice.call(arguments,0);if(!c){c=true;this.emit.apply(this,["success"].concat(g));this.emit("complete")}};this.emitError=function(){var g=Array.prototype.slice.call(arguments,0);if(!c){c=true;this.emit.apply(this,["error"].concat(g));this.emit("complete")}};function b(){var g=Array.prototype.slice.call(arguments,0);a.emit.apply(a,["cancel"].concat(g))}this.cancel=function(){if(!d){d=true;this.removeListener("success");this.removeListener("error");this.removeListener("complete");b()}};this.timeout=function(g){if(typeof g=="undefined"){return e}e=g;if(f){clearTimeout(f);f=null}f=setTimeout(function(){f=null;if(!c&&!d){a.emitError(new Error("timeout"))}},e);return this}};jive.conc.Promise.prototype.then=function(b,a){var c=new jive.conc.Promise();this.addCallback(function(){var d;if(typeof b==="function"){try{d=b.apply(null,arguments);c.emitSuccess(d)}catch(f){c.emitError(f)}}else{c.emitSuccess.apply(c,arguments)}});if(typeof a==="function"){this.addErrback(a)}this.addErrback(function(){c.emitError.apply(c,arguments)});return c};jive.conc.Promise.prototype.map=function(a){return this.then(a)};jive.conc.Promise.prototype.flatMap=function(a){var b=new jive.conc.Promise();this.addCallback(function(){b.proxy(a.apply(null,arguments))}).addErrback(function(){b.emitError.apply(b,arguments)});return b};jive.conc.Promise.prototype.proxy=function(b){var a=this;b.addCallback(function(){a.emitSuccess.apply(a,arguments)}).addErrback(function(){a.emitError.apply(a,arguments)})};jive.conc.Promise.prototype.deferred=function(){var a=new jQuery.Deferred();this.then(function(){a.resolve.apply(a,arguments)},function(){a.reject.apply(a,arguments)});return a.promise()};