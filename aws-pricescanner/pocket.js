
var GetPocket = require('node-getpocket');
var tagsToSearch = ["black friday"];
var fs = require('fs');
var cheerio = require('cheerio');
var productsURLS = require('./products.json');
var request = require('request');21
var productURLs = [];


var config = { "consumer_key": "60606-1dbd927f2eead72137426cd2", 
                "access_token": "9eae4927-cf22-dbd1-4bf8-bcafc4" };


var pocket = new GetPocket(config);

pocket.refreshConfig(config);

var params = {
    "detailType":"complete"

};

pocket.get(params, function(err, resp){
    if(err) throw err;


    var count =0;
    var taggedItems = [];

    var tagsToSearchLength = tagsToSearch.length;

    for(var k in resp.list) {
        var item = resp.list[k];
        var foundTagsCount = 0;
        count++;

        for (var tag in item.tags) {
            if(tagsToSearch.indexOf(tag) > -1){
                foundTagsCount++;
            }

        }

        if (foundTagsCount >= tagsToSearchLength) {
            taggedItems.push(item.given_url);
        }

    }


// console.log("Number of total items = " + count);
// console.log("Number of filtered with tags items = " + taggedItems.length);
// console.log ("Filtered with tags items :\n"/* + JSON.stringify(taggedItems)*/);


taggedItems.forEach(function(ele, idx){
// console.log(ele);

fs.writeFile('products.json', JSON.stringify(taggedItems, null, 4), function(err){

});


});


});


var url = productsURLS[14];


request(url , function(error, response, html) {


       var productPrice;
       var productName;
       var company;
       
       var json = {
            productName: "",
            productPrice: "",
            company: ""
        };
    
    
    if (!error && response.statusCode == 200) {
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
        
        
        fs.writeFile('productPrice.json', JSON.stringify(json, null, 4), function(err){
            console.log('Price saved in price.json file')
            
        });
        
        
   
   fs.readFile('productPrice.json', function(err, data){
       if (err) throw err;
       var obj = JSON.parse(data);
       
       if (obj.productPrice != productPrice) {
           console.log('Price has changed.');
           
  
           
           
           
           fs.writeFile('productPrice.json', JSON.stringify(json, null, 4), function(err){
              console.log('Price saved in Product Price.json file'); 
               
               
           });
           
           
           
       }
       
   });

 }
});
