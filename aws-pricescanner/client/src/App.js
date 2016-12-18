import React from 'react';
import './App.css';

import productsURLS from '../../products.json';
import productPrice from '../../productPrice.json';

import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs';

// import {Table, Column, Cell } from 'fixed-data-table';
// const ProductCell = ({rowIndex, data, col, ...props}) => (
//   <Cell {...props}>
//     {data.keys(rowIndex)[col]()}
//   </Cell> 

//   );



// var App = React.createClass ({
//   render: function () {


//     return (
//       <div>
//           <productTable /> 

//       </div> 
//     );
//   }
//   });












var App = React.createClass ({
  // getInitialState: function(){
  //   return ({products:productsURLS})
  // },



render: function () {
  // var {products} = this.state; 
  return(
    <h3>{JSON.parse(productPrice)}</h3> 

    // <Table
    //     rowHeight={50}
    //     headerHeight={50}
    //     rowsCount={products.length}
    //     width={1000}
    //     height={500}
    //     {...this.props}>

    //     <Column
    //     cell={<Cell data={products} />}
    //     width={50}
    //     /> 
    // </Table> 


  )
}
});

export default App;











