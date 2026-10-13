import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts";


interface Props {
    data:any[];
}


const PieChartComponent = ({data}:Props) => {


const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#f59e0b",
    "#9333ea",
    "#0891b2"
];


return (

<div className="w-full h-[300px]">

<ResponsiveContainer width="100%" height="100%">

<PieChart>


<Pie
data={data}
dataKey="count"
nameKey="reason"

cx="80%"
cy="50%"

outerRadius={50}

label
>

{
data.map((index)=>(

<Cell
key={`cell-${index}`}
fill={COLORS[index % COLORS.length]}
/>

))
}

</Pie>


<Tooltip/>


<Legend

layout="vertical"

align="right"

verticalAlign="bottom"

/>


</PieChart>

</ResponsiveContainer>

</div>

)

}


export default PieChartComponent;