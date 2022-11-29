import React, { Component } from 'react';
const BusTable = ({data, column}) => {
    return (
        <div>  
            <table>
                <thead> 
                    <tr>
                        {column.map((item, index) => <TableHeadItem item={item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => <TableRow item = {item} column = {column} />)}
                </tbody>
            </table>
        </div> 
    )  
}  

const TableRow = ({item, column}) => {  
    // console.log("item: ", item);  
    var i = 0;  
    return <tr>   
        {column.map((columnItem, index) => {  
            // console.log("item: ", item[i]);    
            return <td>{item[i++]}</td>
        })} 
    </tr> 
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;

export default BusTable;