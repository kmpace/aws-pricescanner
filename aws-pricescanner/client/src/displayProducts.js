// function getProducts {
//   return fetch(`/api/products`).then(function(response){
//   	return response.json();
//   }).then(function(j)) {
//   	console.log(j);


//   });

import React from 'react';
import products from '../../products.json';

var displayProducts = React.createClass ({
	getInitialState: function () {
		return {productsURLS: products};
	},

	render: function() {
		return (
		function updateTableHTML(products) {
			var tableBody = document.getElementById("productTable");

			tableBody.innerHTML = "";

			products.forEach(function(row){
				var newRow = document.createElement("tr");
				tableBody.appendChild(newRow);

				if (row instanceof Array) {
					row.forEach(function(cell) {
						var newCell = document.createElement("td");
						newCell.textContent = cell;
						newRow.appendChild(newCell);

					});

				}else {
					var newCell = document.createElement("td");
					newCell.textContent = row;
					newRow.appendChild(newCell);
				}
			})
	});

}
});

export default displayProducts; 






// <table>
			// 	<tr>
			// 		<td>{this.state.products[0]}</td>
			// 	</tr>
			// </table>
			// </div> 
			// );








// const getProduct = React.createClass ({ 
// 	getInitialState: function() {
// 		return {
// 			products:[]

// 		};

// 	},

// getProductsChange: function (cb){
// 	return fetch(`api/products`, {
// 		accept: 'application/json',
// 	}).then(checkStatus)
// 	  .then(parseJSON)
// 	  .then(cb);
// 	},

// checkStatus: function (response) {
// 	if(response.status >= 200 && response.status < 300) {
// 		return response;

// 	} else { 
// 		const error = new Error (`HTTP Error ${response.statusText}`);
// 		error.status = response.statusText;
// 		error.response = response;
// 		console.log(error);
// 		throw error;
// 	}
//   },

// pullProducts: function () { 
// obj = parseJSON(response) 
// 	this.setState({
// 		products: obj,
// 	})

// },
// 	render: function (){
// 		return (
// 			<div id='productDisplay'> 
// 				<table>
// 			<thead>
// 				<h2>Products</h2> 
// 			</thead> 
// 			<tbody>
// 			{
// 				this.state.products.map((product, idx) => (
// 					<tr key={idx}> 

// 					<td>{product}</td> 
// 					</tr> 
// 					))
// 			}
// 			</tbody>
// 			</table> 
// 			</div> 

// 			);
// 		},
// 	}); 

// export default getProducts; 
