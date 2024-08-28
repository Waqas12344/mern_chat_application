import React from 'react'
import {Line,Doughnut} from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip, scales} from 'chart.js';
import { getLast7Days } from '../../lib/features';
import { blue, blueLight, purple, purpleLight } from '../../constants/color';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    ArcElement,
    Legend,
    Tooltip
);

const labels =getLast7Days();

const lineChartOptions={
    responsive:true,
    plugins:{
legend:{
    display:false,
},
title:{
    display:false
}
    },
    scales:{
        x:{
            display:true,
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false,
            }
        }
    }
}
const LineChart = ({value=[]}) => {
    const data ={
labels,
datasets:[{
    data:value,
    label:"revenu",
    fill:true,
    backgroundColor:blueLight,
    borderColor:blue
}]
    }
  return <Line data={data} options={lineChartOptions}  />;
}


const doughnutChartOptions ={
    responsive:true,
    plugins:{
        legend:{
            display:true,
        },
        title:{
            display:true,
        },
    },
    cutout:110,
};

const DoughnutChat=({value=[],labels=[]})=>{

const data ={
    labels,
    datasets:[
        {
            data:value,
            label:"Total Chats VS Group Chats",
            backgroundColor:[blue,purple],
            borderColor:[blueLight,purpleLight],
            offset:35,
        }
    ]
}

    return <Doughnut  style={{zIndex:10}} data={data} options={doughnutChartOptions} />
}

export {LineChart, DoughnutChat}