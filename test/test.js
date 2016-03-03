#!/usr/bin/env node
/* globals before, describe, it */
'use strict';
/**
 * Module dependencies.
 */
var strike_match = process.env.NPM_COV
  ? require('../lib-cov/strike_match')
  : require('../lib/strike_match');
/* End of dependencies. */
var assert = require("assert");
describe("strike_match", function () {
 describe("Undefined",
  function () {
    it("Any word ==>  undefined = " + undefined,
     function () {assert.deepEqual(strike_match("Any word", undefined), undefined);}
    );
    it("Same words ==>  Same words = 2",
     function () {assert.deepEqual(strike_match("Same words", "Same words"), 2);}
    );
  }
 )
 describe("words",
  function () {
   var Healed = {Sealed: 0.8, Healthy: 0.55, Heard: 0.44, Herded: 0.4, Help: 0.25, Sold: 0};
   for(var a in Healed) {
    it("Healed ==> " + a + " = " + Healed[a],
     function () {assert.deepEqual(strike_match("Healed", a), Healed[a]);}
    );
   }
  }
 )

 describe("phrases",
  function () {
   var phrase = ["Web Database Applications", "PHP Web Applications", "Web Aplications"],
   phrases = {
    "Web Database Applications with PHP & MySQL":                      ["0.82", "0.68", "0.59"],
    "Creating Database Web Applications with PHP and ASP":             ["0.71", "0.59", "0.50"],
    "Building Database Applications on the Web Using PHP3":            ["0.70", "0.58", "0.49"],
    "Building Web Database Applications with Visual Studio 6":         ["0.67", "0.47", "0.46"],
    "Web Application Development With PHP":                            ["0.51", "0.67", "0.56"],
    "WebRAD: Building Database Applications on the Web with Visual FoxPro and Web Connection": ["0.49", "0.34", "0.32"],
    "Structural Assessment: The Role of Large and Full-Scale Testing": ["0.12", "0.07", "0.07"],
    "How to Find a Scholarship Online":                                ["0.10", "0.11", "0.12"]
   }
   for (var a = 0; a < phrase.length -1; a++) {
    for(var b in phrases) {
     it(phrase[a] + " ==> " + b + " = " + phrases[b][a],
      function () {assert.deepEqual(strike_match(phrase[a], b), phrases[b][a]);}
     );
    }
   }
  }
 )
});
