var request = require("request");

var options = { method: 'GET',
  url: 'https://avb.oktapreview.com/api/v1/users/00u1r5knwoSpMubTC1t7/factors',
  headers:
   { 'Postman-Token': '6f68bb39-986c-1757-14a1-472a141b77fe',
     'Cache-Control': 'no-cache',
     Authorization: 'SSWS 00-XJOSynEp08sGJc95j2kf-SmQPBPcyYp6TLGDcXz',
     'Content-Type': 'application/json',
     Accept: 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
   var factorsResult = JSON.parse(body)
  var factors = factorsResult.map(factor =>{
   var oktaFactor = {};
   oktaFactor["id"] = factor.id;
   oktaFactor["type"] = factor.factorType;
   return oktaFactor
  });
  console.log(factors);
});
