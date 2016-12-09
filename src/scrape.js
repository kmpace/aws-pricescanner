import request from 'request';
import cheerio from 'cheerio';
import Products from './products.json';

function scrape (url, selector) {
	let productName = '';
	let productPrice = '';
	let productCompany = '';

request(url, (err, response, html) => {
	if (!err) {
        var $ = cheerio.load(html); 
        
       $.fn.ignore = function(sel){
      return this.clone().find(sel||">*").remove().end();
      };
        
        
        
        $('form#product h1').each(function(i, element){
            
            var product = $(this);
            var productName = product.ignore("span").text();
            
            json.productName = productName;
            console.log(productName.trim());
            
            
            // console.log($(this).ignore("span").text());
            
            
            
        })
        
        $('span.price span').each(function(i, element){
            var price = $(this);
            var productPrice = price.text();
            
            json.productPrice = productPrice;
            console.log(productPrice);
        
        })
        
    
    var headerhtml =  $('#header a')
    var company =  $(headerhtml).children('img').attr('alt');
    json.company = company;

    console.log(company);

	}


});


}

module.exports = scrape; 