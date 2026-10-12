import { useEffect, useState } from "react";
import { addInventoryAPI, getAllInventoryAPI, getAllMedicinesAPI, updateInventoryAPI } from "../../Services/AdminServiceOps";
import { validateMedicineInventory, type MedicineInventoryErrors } from "../../Utils/Validators/medicineValidators";
import { FaRegEdit } from "react-icons/fa";
import Loader from "../Common/Loader";
import { MdDeleteForever } from "react-icons/md";




const MedicineInventory=()=>{

    const [editingId, setEditingId] = useState<number | null>(null);

const [inventories, setInventories] = useState<any[]>([]);
const [medicines, setMedicines] = useState<any[]>([]);

const [showForm, setShowForm] = useState<boolean>(false);
const [pageLoading, setPageLoading] = useState<boolean>(true);
const [loading, setLoading] = useState<boolean>(false);

const [medicineId, setMedicineId] = useState<string>("");
const [batchNumber, setBatchNumber] = useState<string>("");
const [quantity, setQuantity] = useState<string>("");
const [expiryDate, setExpiryDate] = useState<string>("");

const [errors, setErrors] = useState<MedicineInventoryErrors>({});

useEffect(() => {

    const loadData = async () => {

        setPageLoading(true);

        try {

            await Promise.all([
                fetchMedicines(),
                fetchInventory()
            ]);

        } catch(error) {
            console.log(error);
        }
        finally {
            setPageLoading(false);
        }

    };

    loadData();

}, []);

const fetchMedicines = async () => {
    try {
        const data = await getAllMedicinesAPI();
        setMedicines(data);
    } catch(err:any){
        console.log(err.response.data);
    }
};


const fetchInventory = async () => {
    try {
        const data = await getAllInventoryAPI();
        setInventories(data);
    } catch(err:any){
        console.log(err.response.data);
    }
};

const resetForm = () => {

    setEditingId(null);

    setMedicineId("");
    setBatchNumber("");
    setQuantity("");
    setExpiryDate("");

    setErrors({});
};


const handleEdit = (inventory: any) => {
    setEditingId(inventory.id);

    setMedicineId(String(inventory.medicineId));
    setBatchNumber(inventory.batchNumber);
    setQuantity(String(inventory.quantity));
    setExpiryDate(inventory.expiryDate);

    setShowForm(true);
};

const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
) => {

    e.preventDefault();

    const inventoryData = {
        medicineId: Number(medicineId),
        batchNumber,
        quantity: Number(quantity),
        expiryDate
    };

    const validationErrors =validateMedicineInventory(inventoryData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }

    setLoading(true);
  
  try {
  
     if (editingId) {
          setLoading(true);
          try {
                    await updateInventoryAPI({
        id: editingId,
        medicineId: Number(medicineId),
        batchNumber,
        quantity: Number(quantity),
        expiryDate,
    });
          }  catch(err:any){
           console.log(err.response.data);
   

}
finally{

    setLoading(false);
};

    

} else {

    await addInventoryAPI({
        medicineId: Number(medicineId),
        batchNumber,
        quantity: Number(quantity),
        expiryDate,
    });

}
    
      await fetchInventory();
  
      resetForm();
      setShowForm(false);
  
  } catch (err) {
      console.log(err);
  } finally {
      setLoading(false);
  }
  }
  
if(pageLoading){
    return <Loader/>;
}

      return(
        <div className="w-screen h-screen p-2">
                  
                   <button onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg" >
          
          Add Inventory
        </button>
    

    
      {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    
              <div className="w-[80%]  bg-white rounded-lg shadow-lg p-2">
    
                {/* Header */}
                <div className="flex justify-between items-center ">
                  <p className="text-xl font-semibold text-green-500">
                    {editingId ? "Edit Inventory" : "Add Inventory"}
                  </p>
    
                  <button
                            onClick={() => { resetForm(); setShowForm(false);}}
                    className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-lg"
                  >
                    X
                  </button>
                </div>
    
                {/* Form */}
                <form onSubmit={handleSubmit} className=" flex flex-col gap-2">
    
                   <div className="flex flex-col">
                    <label >Medicine</label>
                  <select
    value={medicineId}
    onChange={(e) => {
        setMedicineId(e.target.value);

        if (e.target.value) {
            setErrors(prev => ({
                ...prev,
                medicineId: undefined
            }));
        }
    }}
    className="border rounded-lg p-2 outline-none border-green-300"
>
    <option value="">Select Medicine</option>

    {medicines.map((medicine) => (
        <option
            key={medicine.id}
            value={medicine.id}
        >
            {medicine.name}
        </option>
    ))}
</select>
                   </div>
{errors.medicineId && (<p className="text-red-500 text-xs mt-1">    {errors.medicineId}</p>)}

                   <div className="flex flex-col">
                    <label >Batch Number</label>
                                    <input
    type="text"
    value={batchNumber}
    className="border rounded-lg p-2 outline-none border-green-300"
    onChange={(e) => {
        setBatchNumber(e.target.value);

        if (e.target.value.trim()) {
            setErrors(prev => ({
                ...prev,
                batchNumber: undefined
            }));
        }
    }}
/>


                   </div>
 {errors.batchNumber && (<p className="text-red-500 text-xs mt-1">    {errors.batchNumber}</p>)}
                   <div className="flex flex-col">
                    <label >Quantity</label>
                   <input
    type="number"
    value={quantity}
      className="border rounded-lg p-2 outline-none border-green-300"
    onChange={(e) => {
        setQuantity(e.target.value);

        if (Number(e.target.value) > 0) {
            setErrors(prev => ({
                ...prev,
                quantity: undefined
            }));
        }
    }}
/>
                   </div>
{errors.quantity && ( <p className="text-red-500 text-xs mt-1">     {errors.quantity} </p>)}
                   <div className="flex flex-col">
                    <label >Expiry Date</label>
                   <input
    type="date"
      className="border rounded-lg p-2 outline-none border-green-300"
    value={expiryDate}
    onChange={(e) => {
        setExpiryDate(e.target.value);

        if (e.target.value) {
            setErrors(prev => ({
                ...prev,
                expiryDate: undefined
            }));
        }
    }}
/>
                   </div>
                   {errors.expiryDate && ( <p className="text-red-500 text-xs mt-1">     {errors.expiryDate} </p>)}
    
    
                  <div className="flex justify-center gap-3 mt-4">
                <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white transition ${
                loading
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
            }`}
        >
           {loading?editingId?"Updating...":"Saving...":editingId?"Update Stock":"Add Stock"}
        </button>
    
        <button
            type="button"
            onClick={() => { resetForm(); setShowForm(false);}}
            className="px-5 py-2 rounded-lg text-white bg-red-500 hover:bg-red-400"
        >
            Cancel
        </button>
    
       
    
    </div>
    
                </form>
    
              </div>
            </div>
          )}
             
             <p className="text-xl font-medium text-green-500 mt-5">
    Medicine Inventory
</p>

{inventories.length === 0 ? (
    <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
        No inventory found.
    </div>
) : (

       <div>
        <div className="md:hidden ">
    {inventories.map((item) => (
        <div
            key={item.id}
            className="border rounded-lg shadow bg-white p-2 my-2 flex flex-col gap-y-1"
        >
            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Medicine
                </p>
                <p>{item.medicineName}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Batch Number
                </p>
                <p>{item.batchNumber}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Quantity
                </p>
                <p>{item.quantity}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Expiry Date
                </p>
                <p>{item.expiryDate}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Status
                </p>

               <span
            className={`px-2 py-1 rounded text-white text-sm ${
                item.status === "ACTIVE"
                    ? "bg-green-500"
                    : "bg-red-500"
            }`}
        >
            {item.status}
        </span>
            </div>

            <div className="flex justify-end mt-2 gap-2">
                <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
                >
                    <FaRegEdit />
                </button>

              
            </div>
        </div>
    ))}
</div>
        <div className="hidden md:block">
         <div className="w-full mt-5 border rounded-lg overflow-hidden">

        {/* Header */}
        <div className="w-full flex bg-green-500 text-white font-semibold p-1">
            <div className="w-[25%] p-1">Medicine</div>
            <div className="w-[20%] p-1">Batch No.</div>
            <div className="w-[15%] p-1">Quantity</div>
            <div className="w-[20%] p-1">Expiry Date</div>
             <div className="w-[10%] p-1">Status</div>
            <div className="w-[10%] p-1"></div>
        </div>

        {/* Rows */}
        {inventories.map((inventory: any) => (
            <div
                key={inventory.id}
                className="w-full flex border-t p-1 hover:bg-gray-100"
            >
                <div className="w-[25%] p-1 flex items-center">
                    {medicines.find((m: any) => m.id === inventory.medicineId)?.name}
                </div>

                <div className="w-[20%] p-1 flex items-center">
                    {inventory.batchNumber}
                </div>

                <div className="w-[15%] p-1 flex items-center">
                    {inventory.quantity}
                </div>

                <div className="w-[20%] p-1 flex items-center">
                    {inventory.expiryDate}
                </div>
                
                 <div className="w-[10%] p-1 flex items-center">
        <span
            className={`px-2 py-1 rounded text-white text-sm ${
                inventory.status === "ACTIVE"
                    ? "bg-green-500"
                    : "bg-red-500"
            }`}
        >
            {inventory.status}
        </span>
    </div>

                <div className="w-[10%] p-1 flex justify-evenly items-center">
                    <button
                        className="bg-yellow-400 hover:bg-yellow-300 text-white rounded-lg p-1"
                        onClick={() => handleEdit(inventory)}
                    >
                        <FaRegEdit size={18}/>
                    </button>
                </div>
            </div>
        ))}
    </div>
        </div>
       </div>
   
)}

        </div>
      )
}

export default MedicineInventory;