import React, { useState } from "react";


interface FilterProps {

    config:any[];

    initialFilters:any;

    onApplyFilter:(filters:any)=>void;

}


const Filter = ({ config, initialFilters, onApplyFilter }:FilterProps)=>{


const [showFilter,setShowFilter] = useState(false);
const [filters,setFilters] = useState(initialFilters);


const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
const {name,value}=e.target;


setFilters((prev:any)=>({

    ...prev,

    [name]:value

}));


}



const applyFilter=()=>{  
    onApplyFilter(filters); 
     setShowFilter(false);
}




const clearFilter=()=>{


const reset:any={};


Object.keys(initialFilters).forEach((key)=>{


    if(Array.isArray(initialFilters[key])){

        reset[key]=[];

    }
    else{

        reset[key]=null;

    }

});


// restore default sorting

reset.sortBy=initialFilters.sortBy;

reset.sortDirection=initialFilters.sortDirection;



setFilters(reset);


onApplyFilter(reset);


}



return(

<div>


<button onClick={()=>setShowFilter(!showFilter)} className="bg-blue-500 hover:bg-blue-300 text-white px-3 py-2 rounded">
Filter
</button>



{
showFilter &&
<div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">


<div className="bg-white rounded-lg p-4 w-[80%]">


<h3 className="font-semibold mb-3">Filter</h3>

<div className="flex flex-col gap-y-3">


{

config.map((item:any)=>(


<div key={item.name} className="flex items-center gap-x-2">


<label className="w-[30%]">{item.label}</label>
{
item.type==="select" &&
<select name={item.name} value={ filters[item.name] ?? ""}

onChange={handleChange} className="w-full border rounded-lg p-1" >
<option value="">All</option>

{

item.options.map((option:any)=>(


<option key={option.value} value={option.value}>{option.label}</option>
))

}

</select>

}

{
item.type==="date" &&
<input type="date" name={item.name} value={filters[item.name] ?? ""} onChange={handleChange} className="w-full border rounded-lg p-1"/>
}

</div>
))

}
<div className="flex gap-2 mt-3">
<button onClick={applyFilter} className="bg-green-500 text-white px-3 py-2 rounded"
>Apply</button>
<button onClick={clearFilter} className="bg-red-500 text-white px-3 py-2 rounded">Clear</button>
</div>



</div>


</div>


</div>


}


</div>

)

}


export default Filter;