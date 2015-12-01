"use strict";

let request = require('request');
let cheerio = require('cheerio');

const url = 'https://en.wikipedia.org/wiki/International_Bank_Account_Number';
request(url, function(error, response, html) {
  if(!error) {
    let $ = cheerio.load(html);
    let array = [];
    let table = $('table')[2];
    $(table).find('tr').each(function(i, el) {
      if(i !== 0) {
        let countryName = $(el).find('a').attr('title');
        let fields = $(el).find('code').first().text().replace(/[^a-zA-Z]/g, '');
        let countryCode = fields.slice(0, 2);
        fields = fields.slice(4);
        let count = $(el).find('td').eq(1).text();
				var bformat = '';
        $(el).find('td').eq(2).text().replace(' ','').split(',').forEach(function(str, ind, ar) {
					let match = /(\d+)(\D+)/.exec(str);
					bformat += match[2].repeat(parseInt(match[1]));
				});
        console.log("  countrySpecs['" + countryCode + "'] = {chars: " + count +
										", bban_format: '" + bformat + "', bban_fields: '" + fields +
										"', name: '" + countryName + "'};");
      }
    });
  }
});