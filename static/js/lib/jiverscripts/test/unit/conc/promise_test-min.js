module("jive.conc.Promise",{setup:function(){this.promise=new jive.conc.Promise()}});asyncTest("emits a success event",1,function(){this.promise.addCallback(function(){ok(true,"success callback was called");start()});this.promise.emitSuccess()});asyncTest("passes arguments with its success event",1,function(){this.promise.addCallback(function(d,c){ok(d=="foo"&&c=="bar","success callback was given 'foo' and 'bar'");start()});this.promise.emitSuccess("foo","bar")});asyncTest("does not emit success more than once",1,function(){var a=0;this.promise.addCallback(function(){a+=1;ok(a===1,"success callback was called once");start()});this.promise.emitSuccess();this.promise.emitSuccess()});test("addCallback() returns the receiver so that calls can be chained",1,function(){ok(this.promise.addCallback(function(){})===this.promise,"promise.addCallback(...) === promise")});asyncTest("emits an error event",1,function(){this.promise.addErrback(function(){ok(true,"error callback was called");start()});this.promise.emitError()});asyncTest("passes arguments with its error event",1,function(){this.promise.addErrback(function(d,c){ok(d==="foo"&&c==="bar","error callback was called with 'foo' and 'bar'");start()});this.promise.emitError("foo","bar")});asyncTest("does not emit error more than once",1,function(){var a=0;this.promise.addErrback(function(){a+=1;ok(a===1,"error callback was called once");start()});this.promise.emitError();this.promise.emitError()});asyncTest("does not emit success after an error",1,function(){this.promise.addCallback(function(){ok(false,"success callback was called");start()});this.promise.addErrback(function(){ok(true,"error callback was called");start()});this.promise.emitError();this.promise.emitSuccess()});asyncTest("does not emit error after a success",1,function(){this.promise.addCallback(function(){ok(true,"success callback was called");start()});this.promise.addErrback(function(){ok(false,"error callback was called");start()});this.promise.emitSuccess();this.promise.emitError()});test("addErrback() returns the receiver so that calls can be chained",1,function(){ok(this.promise.addErrback(function(){})===this.promise,"promise.addErrback(...) === promise")});asyncTest("emits a cancel event",1,function(){this.promise.addCancelback(function(){ok(true,"cancel callback was called");start()});this.promise.cancel()});asyncTest("does not pass arguments with its cancel event",2,function(){var a;this.promise.addCancelback(function(d,c){ok(typeof d=="undefined","the first argument is undefined");ok(typeof c=="undefined","the second argument is undefined");start()});this.promise.cancel("foo","bar")});asyncTest("does not emit cancel more than once",1,function(){var a=0;this.promise.addCancelback(function(){a+=1;ok(a===1,"cancel callback was called once");start()});this.promise.cancel();this.promise.cancel();this.promise.cancel()});asyncTest("does not emit success after being cancelled",1,function(){this.promise.addCallback(function(){ok(false,"success callback was called");start()});this.promise.addCancelback(function(){ok(true,"cancel callback was called");start()});this.promise.cancel();this.promise.emitSuccess()});asyncTest("does not emit error after being cancelled",1,function(){this.promise.addErrback(function(){ok(false,"error callback was called");start()});this.promise.addCancelback(function(){ok(true,"cancel callback was called");start()});this.promise.cancel();this.promise.emitError()});asyncTest("can emit cancel after a success",2,function(){this.promise.addCallback(function(){ok(true,"success callback was called")});this.promise.addCancelback(function(){ok(true,"cancel callback was called");start()});this.promise.emitSuccess();this.promise.cancel()});asyncTest("can emit cancel after an error",2,function(){this.promise.addErrback(function(){ok(true,"error callback was called")});this.promise.addCancelback(function(){ok(true,"cancel callback was called");start()});this.promise.emitError();this.promise.cancel()});test("addCancelback() returns the receiver so that calls can be chained",1,function(){ok(this.promise.addCancelback(function(){})===this.promise,"promise.addCancelback() === promise")});asyncTest("times out after a given delay",1,function(){var a=new Date();this.promise.addErrback(function(){var b=(new Date())-a;ok(b>=25,"error callback was called after 25 ms elapsed");start()});this.promise.timeout(25)});asyncTest("emits an error with an exception argument on timeout",2,function(){this.promise.addErrback(function(b){ok(b instanceof Error,"error callback is given an error object");ok(b.message.match(/timeout/),"the error message mentions a timeout");start()});this.promise.timeout(25)});asyncTest("does not emit a timeout error after a success",1,function(){this.promise.addErrback(function(){ok(false,"error callback was called")}).addCallback(function(){ok(true,"success callback was called")});this.promise.timeout(20);this.promise.emitSuccess();setTimeout(function(){start()},25)});asyncTest("does not emit a timeout error after another error",1,function(){this.promise.addErrback(function(a){ok(!String(a).match(/timeout/),"non-timeout error was emitted")});this.promise.timeout(20);this.promise.emitError();setTimeout(function(){start()},25)});asyncTest("does not emit a timeout error after being cancelled",1,function(){this.promise.addErrback(function(){ok(false,"error callback was called")}).addCancelback(function(){ok(true,"cancel callback was called")});this.promise.timeout(20);this.promise.cancel();setTimeout(function(){start()},25)});test("returns the previously set timeout if timeout() called with no arguments",1,function(){this.promise.timeout(10000);ok(this.promise.timeout()===10000,"promise timeout set to 10 seconds")});test("returns `undefined` if timeout() called with no arguments and no timeout was set",1,function(){ok(typeof this.promise.timeout()=="undefined","no timeout has been set")});asyncTest("replaces a previous timeout if called with delay values twice",1,function(){var a=new Date();this.promise.addErrback(function(){var b=(new Date())-a;ok(b<100,"error callback called after 25 ms delay");start()});this.promise.timeout(101);this.promise.timeout(25)});test("timeout() returns the receiver so that calls can be chained if called with a delay value",1,function(){ok(this.promise.timeout(10000)===this.promise,"promise.timeout(n) === promise")});asyncTest("emits a 'complete' event after emitting a 'success' event",1,function(){this.promise.always(function(){ok(true,"the 'complete' event handler was called");start()});this.promise.emitSuccess("foo")});asyncTest("emits a 'complete' event after emitting an 'error' event",1,function(){this.promise.always(function(){ok(true,"the 'complete' event handler was called");start()});this.promise.emitError("bar")});asyncTest("does not emit a 'complete' event after emitting a 'cancel' event",0,function(){this.promise.always(function(){ok(false,"the 'complete' event handler was called")});this.promise.cancel();setTimeout(function(){start()},10)});asyncTest("does not emit a 'complete' event after emitting a 'cancel' event even if emitSuccess() is called",0,function(){this.promise.always(function(){ok(false,"the 'complete' event handler was called")});this.promise.cancel();this.promise.emitSuccess();setTimeout(function(){start()},10)});asyncTest("exposes then() method for binding success callbacks",1,function(){this.promise.then(function(){ok(true,"the success handler was called");start()});this.promise.emitSuccess()});asyncTest("accepts error callbacks via the then() method",1,function(){this.promise.then(null,function(){ok(true,"the error handler was called");start()});this.promise.emitError()});asyncTest("returns a new promise from the then() method",1,function(){var a=this.promise.then(function(b){return b+1});a.then(function(b){equal(b,3,"new promise resolved with value 3");start()});this.promise.emitSuccess(2)});asyncTest("forwards errors to new promise created by then()",1,function(){var a=this.promise.then(function(b){return b+1});a.then(null,function(b){equal(b,"error message","new promise fails and gets error message");start()});this.promise.emitError("error message")});asyncTest("fails new promise from then() when success callback throws an error",1,function(){var a=this.promise.then(function(b){throw"synthetic error"});a.then(null,function(b){ok(true,"new promise failed");start()});this.promise.emitSuccess()});