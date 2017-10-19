'use strict'
var l = console.log

/*var obj = {
  getThis: () => {
    return this
  },

  getThisDeep: function(){
  	l('default function this : '); l(this);

  	(() => {
  		l('deep arrow func : '); l(this)
  	})()

  },

  getThisDeepArrow: () => {
  	l('arrow function : '); l(this);

  	(() => {
  		l('deep arrow func in arrow func : '); l(this)
  	})()
  }

}


obj.getThisDeep()
l(' ')
obj.getThisDeepArrow();

l(' '); l(' ');
var getThisDeep = obj.getThisDeep;
var getThisDeepArrow = obj.getThisDeepArrow;

getThisDeep();
l(' ')
getThisDeepArrow();*/


var obj = {
	defFunc_defFunc : function(){
		l('default function this : '); l(this); // obj

		(function(){
			l('deep default function this : '); l(this); //undefined
		})()
	},

	defFunc_arrowFunc: function(){
		l('default function this : '); l(this); //obj

		(() => {
			l('deep arrow function this : '); l(this); //obj
		})()
	},

	arrowFunc_defFunc : () => {
		l('arrow function this : '); l(this); //Window

		(function(){
			l('deep default function this : '); l(this); // undefined
		})()
	},

	arrowFunc_arrowFunc : () => {
		l('arrow function this : '); l(this); //Window

		(() => {
			l('deep arrow function this : '); l(this); //Window
		})()
	},
}

var out_defFunc_defFunc = obj.defFunc_defFunc; 
var out_defFunc_arrowFunc = obj.defFunc_arrowFunc;
var out_arrowFunc_defFunc = obj.arrowFunc_defFunc;
var out_arrowFunc_arrowFunc = obj.arrowFunc_arrowFunc;


l('defFunc_defFunc'); obj.defFunc_defFunc(); l(' ');
l('defFunc_arrowFunc'); obj.defFunc_arrowFunc(); l(' ');
l('arrowFunc_defFunc'); obj.arrowFunc_defFunc(); l(' ');
l('arrowFunc_arrowFunc'); obj.arrowFunc_arrowFunc(); l(' ');l(' ');l(' ');
l('out_defFunc_defFunc'); out_defFunc_defFunc();l(' ');
l('out_defFunc_arrowFunc'); out_defFunc_arrowFunc();l(' ');
l('out_arrowFunc_defFunc'); out_arrowFunc_defFunc();l(' ');
l('out_arrowFunc_arrowFunc'); out_arrowFunc_arrowFunc();l(' ');







