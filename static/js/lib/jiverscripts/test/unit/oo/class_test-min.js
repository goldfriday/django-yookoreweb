module("class");test("creates a class",1,function(){var a=jive.oo.Class.extend(function(){});ok(typeof a=="function","extend() returns a constructor")});test("a class constructs an object",1,function(){var a=jive.oo.Class.extend(function(){});var b=new a();ok(typeof b=="object"&&b,"an instance is of type 'object'")});test("classes keep a reference to their definition",1,function(){var b=function(c){c.foo=1};var a=jive.oo.Class.extend(b);ok(a.definition===b,"klass.definition is a reference to the original definition of klass")});module("class members");test("public methods are publicly accessible",1,function(){var a=jive.oo.Class.extend(function(c){this.hello=function(){return"hello"}});var b=new a();ok(b.hello()=="hello","the return value of hello() is 'hello'")});test("protected members are not publicly accessible",2,function(){var a=jive.oo.Class.extend(function(c){c.goodbye=function(){return"goodbye"};c.init=function(){this.name="foo"}});var b=new a();ok(typeof b.goodbye=="undefined","protected methods are not publicly accessible");ok(typeof b.name=="undefined","protected variables are not publicly accessible")});test("protected members can be accessed from public methods",1,function(){var a=jive.oo.Class.extend(function(c){this.hello=function(){return this.greeting()+" "+this.name};c.greeting=function(){return"hello"};c.init=function(){this.name="world"}});var b=new a();ok(b.hello()=="hello world","hello() calls into protected members")});test("protected members can be accessed from protected methods",1,function(){var a=jive.oo.Class.extend(function(c){this.hello=function(){return this.greeting()};c.greeting=function(){return"hello "+this.name};c.init=function(){this.name="world"}});var b=new a();ok(b.hello()=="hello world","hello() calls into protected members")});test("public variables are not allowed",1,function(){try{var a=jive.oo.Class.extend(function(){this.foo=1})}catch(b){ok(true,"an error is thrown when declaring a public variable")}});test("public methods are always invoked in the context of the object that they belong to",1,function(){var a=jive.oo.Class.extend(function(d){this.hello=function(){return this.greeting()};d.greeting=function(){return"hello "+this.name};d.init=function(){this.name="world"}});var c=new a();var b=c.hello;ok(b()=="hello world","a copied reference of hello() runs in the same context as the original")});test("public methods that return `this` return reference to the public interface of an object",1,function(){var a=jive.oo.Class.extend(function(){this.chain=function(){return this}});var b=new a();ok(b.chain()===b,"chain() returns a reference to its receiver")});module("inheritance");test("public methods defined on a superclass are publicly accessible",1,function(){var a=jive.oo.Class.extend({hello:function(){return"hello"}});var b=a.extend({});var c=new b();ok(c.hello()=="hello","called superclass method hello() externally")});test("public methods can access protected members of a superclass",1,function(){var a=jive.oo.Class.extend(function(d){d.greeting=function(){return"hello"};d.init=function(){this.name="world"}});var b=a.extend(function(){this.hello=function(){return this.greeting()+" "+this.name}});var c=new b();ok(c.hello()=="hello world","hello() calls into protected members of the superclass")});test("protected methods can access protected members of a superclass",1,function(){var a=jive.oo.Class.extend(function(d){d.init=function(){this.name="world"}});var b=a.extend(function(d){this.hello=function(){return this.greeting()};d.greeting=function(){return"hello "+this.name}});var c=new b();ok(c.hello()=="hello world","greeting() reads from a superclass member")});test("public methods can access public methods of a superclass",1,function(){var a=jive.oo.Class.extend(function(d){this.greeting=function(){return"hello"}});var b=a.extend(function(d){this.hello=function(){return this.greeting()}});var c=new b();ok(c.hello()=="hello","hello() calls superclass method greeting()")});test("protected methods can access public methods of a superclass",1,function(){var a=jive.oo.Class.extend(function(){this.hello=function(){return"hello"}});var b=a.extend(function(d){this.goodbye=function(){return this.sayGoodbye()};d.sayGoodbye=function(){return this.hello()+"? goodbye!"}});var c=new b();ok(c.goodbye()=="hello? goodbye!","sayGoodbye() calls hello() on superclass")});test("overridden public methods can invoke the super definition of the same method",1,function(){var a=jive.oo.Class.extend(function(){this.sum=function(e,d){return e+d}});var b=a.extend(function(d,e){this.sum=function(g,f){return"sum is: "+e.sum.call(this,g,f)}});var c=new b();ok(c.sum(2,3)=="sum is: 5","sum() decorates its super definition")});test("overridden protected methods can invoke the super definition of the same method",1,function(){var a=jive.oo.Class.extend(function(d){d.sum=function(f,e){return f+e}});var b=a.extend(function(d,e){d.sum=function(g,f){return"sum is: "+e.sum.call(this,g,f)};this.getSum=function(g,f){return this.sum(g,f)}});var c=new b();ok(c.getSum(2,3)=="sum is: 5","sum() decorates its super definition")});test("stateful methods in a superclass affect the state of an instance",1,function(){var a=jive.oo.Class.extend(function(){this.init=function(d){this.count=(d||0)};this.inc=function(d){this.count+=(d||1)}});var b=a.extend(function(){this.getCount=function(){return this.count}});var c=new b();c.inc();c.inc();equal(c.getCount(),2,"the count of obj is 2")});test("classes have a 'superclass' property",1,function(){var a=jive.oo.Class.extend();var b=a.extend();ok(b.superclass===a,"the super class of subklass is klass")});module("initializing");test("Initialize method init() is called when a new instance is created",1,function(){var b=false;var a=jive.oo.Class.extend(function(d){d.init=function(){b=true}});var c=new a();ok(b,"init() was called")});test("Arguments given to the class constructer are passed to init()",1,function(){var b=false;var a=jive.oo.Class.extend(function(d){d.init=function(f,e){b=f&&e}});var c=new a(true,true);ok(b,"init() was called")});module("reflection");test("An object is an instance of the class that constructed it",1,function(){var a=jive.oo.Class.extend({}),b=new a();ok(b instanceof a,"obj is an instance of klass")});test("An instance of a subclass is also an instance of its parent class",1,function(){var a=jive.oo.Class.extend({}),b=a.extend({}),c=new b();ok(c instanceof a,"obj is an instance of klass")});test("An instance of a subsubclass is also an instance of its grandparent class",1,function(){var a=jive.oo.Class.extend({}),b=a.extend({}),d=b.extend({}),c=new d();ok(c instanceof a,"obj is an instance of klass")});