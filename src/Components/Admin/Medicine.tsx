import { useEffect, useState } from "react";
import { validateMedicine, type MedicineErrors } from "../../Utils/Validators/medicineValidators";
import { medicineCategories } from "../../Utils/constants/Medicine";
import { medicineTypes } from "../../Utils/constants/Medicine";
import { addMedicineServiceAPI, getAllMedicinesAPI, updateMedicineAPI } from "../../Services/AdminServiceOps";
import { FaRegEdit } from "react-icons/fa";
import Loader from "../Common/Loader";
import Pagination from "../Common/Pagination";


const Medicine=()=>{
    const [editingId, setEditingId] = useState<number | null>(null);  
    const [medicines, setMedicines] = useState<any[]>([]); 
     const [errors,setErrors]=useState<MedicineErrors>({});
      const [showForm, setShowForm] = useState<boolean>(false);
      const [pageLoading, setPageLoading] = useState<boolean>(true);
const [loading, setLoading] = useState<boolean>(false);
      const [name, setName] = useState<string>("");
const [dosage, setDosage] = useState<string>("");
const [category, setCategory] =useState<string>("");
const [type, setType] = useState<string>("");
const [manufacturer, setManufacturer] =useState<string>("");
const [unitPrice, setUnitPrice] = useState("");
const [currentPage,setCurrentPage] = useState(0);
const [totalPages,setTotalPages] = useState(0);

const pageSize = 5;


useEffect(() => {

    const loadMedicines = async () => {

        setPageLoading(true);

        try {
            await fetchMedicines(currentPage);
        } 
        catch(error) {
            console.log(error);
        }
        finally {
            setPageLoading(false);
        }

    };

    loadMedicines();

}, [currentPage]);

const fetchMedicines = async(page:number)=>{

    try{

        const response = await getAllMedicinesAPI(
            page,
            pageSize
        );


        setMedicines(response.content || []);

        setTotalPages(response.totalPages || 0);


    }catch(error){

        console.log(error);

        setMedicines([]);

    }

};

const resetForm = () => {
    setEditingId(null);

    setName("");
    setDosage("");
    setCategory("");
    setType("");
    setManufacturer("");
    setUnitPrice("");

    setErrors({});
};


const handleEdit = (medicine: any) => {
    setEditingId(medicine.id);

    setName(medicine.name);
    setDosage(medicine.dosage);
    setCategory(medicine.category);
    setType(medicine.type);
    setManufacturer(medicine.manufacturer);
    setUnitPrice(medicine.unitPrice);

    setShowForm(true);
};
 



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const medicineData = {
        name,
        dosage,
        category,
        type,
        manufacturer,
        unitPrice,
    };

    const validationErrors = validateMedicine(medicineData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }

    setLoading(true);


    try {
        if (editingId !== null) {
            await updateMedicineAPI({
                id: editingId,
                ...medicineData,
            });
        } else {
            await addMedicineServiceAPI(medicineData);
        }

       await fetchMedicines(currentPage);

        resetForm();
        setShowForm(false);
    } catch (err: any) {
        console.error(err);

      
    } finally {
        setLoading(false);
    }
};



 if (pageLoading) {
        return <Loader />;
    } 

     return(
        <div className="w-screen h-screen p-2">
        
              <button onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg" >
          
          Add Medicine
        </button>
      



  {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-[80%]  bg-white rounded-lg shadow-lg p-2">

            {/* Header */}
            <div className="flex justify-between items-center ">
              <p className="text-xl font-semibold text-green-500">
                {editingId ? "Edit Medicine" : "Add Medicine"}
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
                <label className="font-medium">Medicine Name</label>
                <input
                  type="text"
                   value={name}
    onChange={(e) => {
        setName(e.target.value);

        if (e.target.value.trim()) {
            setErrors(prev => ({
                ...prev,
                medicineName: undefined,
            }));
        }
    }}
                  placeholder="Enter medicine name"
                  className="border rounded-lg p-2 outline-none border-green-300"
                />
              </div>
              {errors.name && (
<p className="text-red-500 text-xs mt-1">
    {errors.name}
</p>
)}             
                    <div className="w-full flex gap-x-2">
                        <div className="w-[50%] flex flex-col gap-y-1">
                             <div className="flex flex-col">
                <label className="font-medium">Dosage</label>
                <input
                  type="text"
                   value={dosage}
    onChange={(e) => {
        setDosage(e.target.value);

        if (e.target.value.trim()) {
            setErrors(prev => ({
                ...prev,
                dosage: undefined,
            }));
        }
    }}
                  placeholder="e.g. 500mg"
                  className="border rounded-lg p-2 outline-none border-green-300"
                />
              </div>
                 {errors.dosage && (
<p className="text-red-500 text-xs mt-1">
    {errors.dosage}
</p>
)}            
                        </div>
                        <div className="w-[50%] flex flex-col gap-y-1">
                                          <div className="flex flex-col">
                <label className="font-medium">Unit Price</label>
                <input
                  type="number" min="0" max="10000"
                   value={unitPrice}
    onChange={(e) => {
        setUnitPrice(e.target.value);

        if (e.target.value.trim()) {
            setErrors(prev => ({
                ...prev,
                unitPrice: undefined,
            }));
        }
    }}
                  placeholder="Enter price"
                  className="border rounded-lg p-2 outline-none border-green-300"
                />
              </div>
         {errors.unitPrice && (
<p className="text-red-500 text-xs mt-1">
    {errors.unitPrice}
</p>
)}
                        </div>
                    </div>
             
                <div className="w-full flex gap-x-2">
                      <div className="w-[50%]">
                                         <div className="flex flex-col">
                <label className="font-medium">Category</label>
               <select
    value={category}
        onChange={(e) => {
        setCategory(e.target.value);

        if (e.target.value) {
            setErrors((prev) => ({
                ...prev,
                category: undefined,
            }));
        }
    }}

    className="border rounded-lg p-2 outline-none border-green-300"
>
    <option value="" className="outline-none">Select Category</option>

    {medicineCategories.map(category=>(
        <option key={category} value={category} className="outline-none">
            {category}
        </option>
    ))}

</select>
              </div>
          {errors.category && (
<p className="text-red-500 text-xs mt-1">
    {errors.category}
</p>
)}
                      </div>
                      <div className="w-[50%]">
                          <div className="flex flex-col">
                <label className="font-medium">Type</label>
               <select
    value={type}
    onChange={(e) => {
        setType(e.target.value);

        if (e.target.value) {
            setErrors((prev) => ({
                ...prev,
                type: undefined,
            }));
        }
    }}
    className="border rounded-lg p-2 outline-none border-green-300"
>
    <option value="" className="outline-none">Select Type</option>

    {medicineTypes.map(type=>(
        <option key={type} value={type} className="outline-none">
            {type}
        </option>
    ))}

</select>
              </div>
{errors.type && (
<p className="text-red-500 text-xs mt-1">
    {errors.type}
</p>
)}
                      </div>
                </div>

            
              <div className="flex flex-col">
                <label className="font-medium">Manufacturer</label>
                <input
                  type="text"
                   value={manufacturer}
    onChange={(e) => {
        setManufacturer(e.target.value);

        if (e.target.value.trim()) {
            setErrors(prev => ({
                ...prev,
                manufacturer: undefined,
            }));
        }
    }}
                  placeholder="Enter manufacturer"
                  className="border rounded-lg p-2 outline-none border-green-300"
                />
              </div>
{errors.manufacturer && (
<p className="text-red-500 text-xs mt-1">
    {errors.manufacturer}
</p>
)}



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
       {loading?editingId?"Updating...":"Saving...":editingId?"Update Medicine":"Save Medicine"}
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

          <p className="text-xl font-medium text-green-500 mt-5">  Medicines</p>

{medicines.length === 0 ? (
    <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
        No medicines found.
    </div>
) : (  
       <div>
        <div className="md:hidden">
    {medicines.map((medicine) => (
        <div
            key={medicine.id}
            className="border rounded-lg shadow bg-white p-2 my-2 flex flex-col gap-y-1"
        >
            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Medicine
                </p>
                <p>{medicine.name}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Dosage
                </p>
                <p>{medicine.dosage}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Category
                </p>
                <p>{medicine.category}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Type
                </p>
                <p>{medicine.type}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Stock
                </p>
                <p>{medicine.stock}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Unit Price
                </p>
                <p>₹{medicine.unitPrice}</p>
            </div>

            <div className="flex justify-end mt-2">
                <button
                    onClick={() => handleEdit(medicine)}
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
            
            <div className="w-[20%] p-1">Medicine</div>
            <div className="w-[10%] p-1">Dosage</div>
            <div className="w-[15%] p-1">Category</div>
            <div className="w-[10%] p-1">Type</div>
            <div className="w-[20%] p-1">Stock</div>
            <div className="w-[10%] p-1">Price</div>
             <div className="w-[10%] p-1"></div>
        </div>

        {/* Rows */}
        {medicines.map((medicine) => (
            <div
                key={medicine.id}
                className="w-full flex p-1 border-t hover:bg-gray-100"
            >
                

                <div className="w-[20%] flex items-center p-1 break-words">
                    {medicine.name}
                </div>

                <div className="w-[10%] flex items-center p-1">
                    {medicine.dosage}
                </div>

                <div className="w-[15%] flex items-center p-1">
                    {medicine.category}
                </div>

                <div className="w-[10%] flex items-center p-1">
                    {medicine.type}
                </div>

                <div className="w-[20%] flex items-center p-1 break-words">
                    {medicine.stock}
                </div>

                <div className="w-[10%] flex items-center p-1">
                    ₹{medicine.unitPrice}
                </div>
<div className="w-[10%] flex justify-evenly items-center p-1">

    <button
        onClick={() => handleEdit(medicine)}
        className="bg-yellow-400 hover:bg-yellow-300 text-white rounded-lg p-1"
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
       <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page)=>setCurrentPage(page)}
/>
              </div>
     )
}

export default Medicine;