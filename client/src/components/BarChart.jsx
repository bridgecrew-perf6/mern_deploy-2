// BarChart.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


function BarChart(props) {


  const [data, setData] = useState({
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: 'Place Holder - Fetching DATA',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  });

 

  useEffect(()=>{
    let qdata ={
      labels: [],
      datasets: [
        {
          label: '# Quotes',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ]
    }
    
    let infoSet = {};

    axios.get('http://localhost:8000/api/quotes')
    .then(res=>{
      for(let i=0; i<res.data.result.length;i++){
        if(infoSet[res.data.result[i].auth_id.name]==undefined){
          infoSet[res.data.result[i].auth_id.name]= 1;
          qdata.labels.push(res.data.result[i].auth_id.name)
        }
        else{
          infoSet[res.data.result[i].auth_id.name]= infoSet[res.data.result[i].auth_id.name]+1; 
        }      
      }
      
      Object.values(infoSet).forEach(val=>
        {
          qdata.datasets[0].data.push(val)
        })
    setData(qdata)
  })
    .catch(err=>{console.log("quote chart build issue",err)})
  
    
  },[props.changed])
  

  

  return (
    <div>


      <Bar
        data={data}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  )
}
export default BarChart;