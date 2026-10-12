import { useEffect, useState } from "react";
import { getAllMedicinesAPI, getAllSalesAPI, getSaleItemsAPI } from "../../Services/AdminServiceOps";
import { MdDeleteForever } from "react-icons/md";
import { createSaleAPI } from "../../Services/AdminServiceOps";
import { validateSale, type SaleErrors } from "../../Utils/Validators/saleValidators";
import { FaRegEye } from "react-icons/fa";
import Loader from "../Common/Loader";



interface SaleItem {
    medicineId: string;
    quantity: string;
    medicineError: string;
    quantityError: string;
    
}

const Sales=()=>{


const [saleItems, setSaleItems] = useState<SaleItem[]>([
    {
        medicineId: "",
        quantity: "",
        medicineError: "",
         quantityError: ""
    }
]);
   const [buyerName, setBuyerName] = useState("");
const [buyerContact, setBuyerContact] = useState("");

const [errors, setErrors] = useState<SaleErrors>({});
    const [showForm, setShowForm] = useState<boolean>(false);
   const [pageLoading, setPageLoading] = useState<boolean>(true);
const [loading, setLoading] = useState<boolean>(false);
    const [medicines, setMedicines] = useState<any[]>([]);
    const [sales,setSales]=useState<any[]>([]);
 const [selectedSaleItems, setSelectedSaleItems] = useState<any[]>([]);
const [showSaleDetails, setShowSaleDetails] = useState(false);
 const [selectedSale, setSelectedSale] = useState<any>(null);

useEffect(() => {

    const loadPageData = async () => {

        setPageLoading(true);

        try {
            await Promise.all([
                fetchMedicines(),
                fetchSales()
            ]);

        } catch(err){
            console.log(err);
        }
        finally{
            setPageLoading(false);
        }

    }

    loadPageData();

}, []);



const viewSaleDetails = async (sale: any) => {

    const data = await getSaleItemsAPI(sale.id);

    setSelectedSaleItems(data);
    setSelectedSale(sale);

    setShowSaleDetails(true);
}


const fetchMedicines = async () => {
    const data = await getAllMedicinesAPI();
    setMedicines(data);
};

const fetchSales=async()=>{

    const data=await getAllSalesAPI();

    setSales(data);
}

const selectedMedicineIds = saleItems
    .map(item => item.medicineId)
    .filter(id => id !== "");



const addMoreMedicine = () => {

    const updated = [...saleItems];
    const lastIndex = updated.length - 1;
    let valid = true;

    if (!updated[lastIndex].medicineId) {
        updated[lastIndex].medicineError = "Please select medicine";
        valid = false;
    }
    if (!updated[lastIndex].quantity) {
        updated[lastIndex].quantityError= "Enter quantity";
        valid = false;
    }
     if (
    updated[lastIndex].medicineError ||
    updated[lastIndex].quantityError
) {
    valid = false;
}

    setSaleItems(updated);

    if (!valid) return;

    setSaleItems(prev => [
        ...prev,
        {
            medicineId: "",
            quantity: "",
            medicineError:"",
            quantityError:""
        }
    ]);
};


const removeMedicine = (index: number) => {
    setSaleItems(prev => prev.filter((_, i) => i !== index));
};


    const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
) => {

    e.preventDefault();
     
    const validationErrors = validateSale({
    buyerName,
    buyerContact
});

setErrors(validationErrors);

if (Object.keys(validationErrors).length > 0) {
    return;
}

    let valid = true;

    const updated = [...saleItems];

    

  updated.forEach((item, index) => {

    const medicine = medicines.find(
        m => String(m.id) === item.medicineId
    );

    if (!item.medicineId) {
        updated[index].medicineError = "Please select medicine";
        valid = false;
        return;
    }

    // Skip validation for out-of-stock medicines
    if (medicine?.stock === 0) {
        return;
    }

    if (!item.quantity) {
        updated[index].quantityError = "Enter quantity";
        valid = false;
    }

    if (item.medicineError || item.quantityError) {
        valid = false;
    }
});

    setSaleItems(updated);

    if (!valid) return;

     setLoading(true);

try {

 const totalAmount = saleItems.reduce((sum, item) => {
    const medicine = medicines.find(
        m => String(m.id) === item.medicineId
    );

    if (!medicine) return sum;

    return sum + medicine.unitPrice * Number(item.quantity);
}, 0);

const data = {
    buyerName,
    buyerContact,
    totalAmount,
    saleItems: saleItems
        .filter(item => {
            const medicine = medicines.find(
                m => String(m.id) === item.medicineId
            );

            return medicine && medicine.stock > 0;
        })
        .map(item => ({
            medicineId: Number(item.medicineId),
            quantity: Number(item.quantity)
        }))
};
    const response = await createSaleAPI(data);

    console.log(response);

    resetForm();
    setShowForm(false);
    fetchMedicines();
    fetchSales();

       }
     catch(err:any){
           console.log(err.response.data);
   

}
finally{

    setLoading(false);


}

};

const resetForm = () => {

    setBuyerName("");
    setBuyerContact("");

    setErrors({});

    setSaleItems([
        {
            medicineId: "",
            quantity: "",
            medicineError: "",
            quantityError: ""
        }
    ]);
};

if(pageLoading){
    return <Loader/>
}

    return(
        <div className="min-h-screen w-screen p-2">
                 
                
            <button onClick={() => setShowForm(true)}
             className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg" >
           Sell Medicine</button>

     {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    
            <div className="w-[95%] md:w-[80%] max-h-[90vh] bg-white rounded-lg shadow-lg flex flex-col">
    
                {/* Header */}
                <div className="flex justify-between items-center p-2 ">
                  <p className="text-xl font-semibold text-green-500">
                       Sell Medicine
                  </p>
    
                  <button
                            onClick={() => { resetForm(); setShowForm(false);}}
                    className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-lg"
                  >
                    X
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                <div className="w-full flex flex-col gap-y-2">
                    <p className="text-xl font-semibold text-green-500">
                       Buyer Information
                  </p>
                  <div className="border border-gray-300 rounded-lg p-4 mb-3">
                     
                     <div className="flex flex-col mb-2">
                        <label className="font-medium" >Buyer Name</label>
                      <input
    type="text"
    value={buyerName}
    onChange={(e) => {
        setBuyerName(e.target.value);
        setErrors(prev => ({
            ...prev,
            buyerName: undefined
        }));
    }}
    className="w-full border rounded-lg p-2 border-green-500 outline-none my-1"
/>

{errors.buyerName && (
    <p className="text-red-500 text-sm">
        {errors.buyerName}
    </p>
)}  </div>
                     <div className="flex flex-col mb-2">
                        <label className="font-medium">Buyer Contact</label>
                       <input
    type="tel"
    value={buyerContact}
    onChange={(e) => {
        setBuyerContact(e.target.value);
        setErrors(prev => ({
            ...prev,
            buyerContact: undefined
        }));
    }}
    className="w-full border rounded-lg p-2 border-green-500 outline-none my-1"
/>

{errors.buyerContact && (
    <p className="text-red-500 text-sm">
        {errors.buyerContact}
    </p>
)}
  </div>

                </div>
                </div>
                 
    
                {/* Form */}
                <form onSubmit={handleSubmit} className=" flex flex-col gap-2">
                 <p className="text-xl font-semibold text-green-500">
                        Medicine Information
                  </p>
{saleItems.map((item, index) => {
    const selectedMedicine = medicines.find(
        medicine => String(medicine.id) === item.medicineId
    );

const totalPrice =
    selectedMedicine &&
    selectedMedicine.stock > 0 &&
    item.quantity
        ? selectedMedicine.unitPrice * Number(item.quantity)
        : 0;

    return (<div
        key={index}
        className="border border-gray-300 rounded-lg p-4 mb-3"
    >

        <div className="flex flex-col mb-2">
            <div className="w-full flex items-center justify-between">
                 <label className="font-medium">Medicine</label>

                     {index > 0 && (
            <button
                type="button"
                onClick={() => removeMedicine(index)}
                className="bg-red-500 hover:bg-red-300 text-white px-3 py-1 rounded"
            >
                <MdDeleteForever size={18}/>
            </button>
        )}
            </div>
           
            <select
                value={item.medicineId}
                onChange={(e) => {
                    const updated = [...saleItems];
                    updated[index].medicineId = e.target.value;
                    updated[index].quantity = "";
                    updated[index].medicineError = "";
                    updated[index].quantityError="";
                    setSaleItems(updated);
                }}
                className="border rounded-lg p-2 border-green-500 outline-none my-1"
            >
                <option value="">Select Medicine</option>

               {medicines
    .filter(
        medicine =>
            !selectedMedicineIds.includes(String(medicine.id)) ||
            String(medicine.id) === item.medicineId
    )
    .map(medicine => (
        <option key={medicine.id} value={medicine.id}>
               {medicine.name} ({medicine.dosage}) - {medicine.manufacturer} 

        </option>
    ))}
            </select>

           {selectedMedicine && (
    <p className="text-green-600 text-sm mt-1">
        Current Stock : {selectedMedicine.stock}
    </p>
)}
        </div>
     {item.medicineError && (
    <p className="text-red-500 text-sm">
        {item.medicineError}
    </p>
)}
        <div className="flex flex-col mb-2">
    <label className="font-medium">Quantity</label>

    {selectedMedicine?.stock === 0 ? (
        <p className="text-red-500 font-medium">
            Medicine stock is not available.
        </p>
    ) : (
        <div>
            <input
                type="number" min={1}
                value={item.quantity}
                onChange={(e) => {

                       const value = e.target.value;

                    const updated = [...saleItems];

                     if (Number(value) <= 0) {
    updated[index].quantity = "";
    updated[index].quantityError = "Quantity must be greater than 0";
    setSaleItems(updated);
    return;
}
                 

                    if (
                        selectedMedicine &&
                        Number(value) > selectedMedicine.stock
                    ) {
                        updated[index].quantityError =
                            `Enter value below stock (${selectedMedicine.stock})`;
                    } else {
                        updated[index].quantity = value;
                        updated[index].quantityError = "";
                    }

                    setSaleItems(updated);
                }}
                className="w-full border rounded-lg p-2 border-green-500 outline-none my-1"
            />

          {item.quantityError && (
    <p className="text-red-500 text-sm">
        {item.quantityError}
    </p>
)}
        </div>
    )}
{selectedMedicine && selectedMedicine.stock > 0 &&  item.quantity && (
    <div className="mt-2 text-sm">
        <p className="font-semibold text-green-600">
            Total Price = ₹{selectedMedicine.unitPrice} × {item.quantity || 0}
            {" = "}
            ₹{totalPrice}
        </p>
    </div>
)}
</div>

   

    </div>
    )
})}
                   
                 <button
    type="button"
    onClick={addMoreMedicine}
    className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-lg"
>
    Add More Medicine
</button>
       <div className="w-full flex gap-x-2">
  <button
type="submit"
 className="w-[50%] bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-lg"
disabled={loading}
>
{loading ? "Selling..." : "Sell"}
</button>
         <button type="button"onClick={() => {
        resetForm();
        setShowForm(false);
    }}
    className="w-[50%] bg-red-500 hover:bg-red-300 text-white px-4 py-2 rounded-lg"
>
    Cancel
</button>
       </div>
        

                </form>
    
              </div>
              </div>
            </div>
          )}



          <p className="text-xl font-medium text-green-500 mt-5">
    Sales History
</p>

{sales.length === 0 ? (
    <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
        No sales found.
    </div>
) : (
    <div>

        {/* Mobile Cards */}
        <div className="md:hidden">
            {sales.map((sale: any) => (
                <div
                    key={sale.id}
                    className="border rounded-lg shadow bg-white p-2 my-2 flex flex-col gap-y-1"
                >
                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Buyer Name
                        </p>
                        <p>{sale.buyerName}</p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Contact
                        </p>
                        <p>{sale.buyerContact || "-"}</p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Total Amount
                        </p>
                        <p>₹ {sale.totalAmount}</p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Date
                        </p>
                        <p>{new Date(sale.saleDate).toLocaleString()}</p>
                    </div>

                    <div className="flex justify-end mt-2">
                        <button
                            onClick={() => viewSaleDetails(sale)}
                            className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            <FaRegEye />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
            <div className="w-full  border rounded-lg overflow-hidden">

                <div className="w-full flex bg-green-500 text-white font-semibold p-2">
                    <div className="w-[30%]">Buyer Name</div>
                    <div className="w-[20%]">Contact</div>
                    <div className="w-[15%]">Total Amount</div>
                    <div className="w-[30%]">Date</div>
                    <div className="w-[5%]"></div>
                </div>

                {sales.map((sale: any) => (
                    <div
                        key={sale.id}
                        className="flex border-t p-2 hover:bg-gray-100"
                    >
                        <div className="w-[30%] break-words">
                            {sale.buyerName}
                        </div>

                        <div className="w-[20%] break-words">
                            {sale.buyerContact || "-"}
                        </div>

                        <div className="w-[15%]">
                            ₹ {sale.totalAmount}
                        </div>

                        <div className="w-[30%] break-words">
                            {new Date(sale.saleDate).toLocaleString()}
                        </div>

                        <div className="w-[5%] flex justify-center items-center">
                            <FaRegEye
                                onClick={() => viewSaleDetails(sale)}
                                className="text-blue-500 hover:text-blue-300 cursor-pointer"
                                size={20}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div>
)}


{
showSaleDetails && (

<div className="w-full fixed inset-0 bg-black/40 flex items-center justify-center p-2">

<div className="bg-white w-full rounded-lg p-5">
<div>{selectedSale && (

    <div className="mb-5 border rounded-lg p-3 bg-gray-50">

        <p>
            <b>Buyer Name:</b> {selectedSale.buyerName}
        </p>

        <p>
            <b>Contact:</b> {selectedSale.buyerContact}
        </p>

        <p>
            <b>Total Amount:</b> ₹{selectedSale.totalAmount}
        </p>

        <p>
            <b>Date:</b>{" "}
            {new Date(selectedSale.saleDate).toLocaleString()}
        </p>

    </div>
)}
    
</div>
<div className="flex justify-between">

<h2 className="text-xl font-semibold text-green-500">
Purchased Medicines
</h2>


<button
onClick={()=>setShowSaleDetails(false)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
X
</button>

</div>



<div className="w-full mt-5 border rounded">

<div className="flex bg-green-500 text-white p-2 font-semibold">

<div className="w-[40%]">
Medicine
</div>



<div className="w-[20%]">
Quantity
</div>

<div className="w-[20%]">
Price
</div>

<div className="w-[20%]">
    Total Price
</div>

</div>



{
selectedSaleItems.map((item:any)=>(

<div 
key={item.id}
className="flex border-t p-2"
>


<div className="w-[40%]">

{
medicines.find(
m=>m.id===item.medicineId
)?.name
}

</div>




<div className="w-[20%]">
{item.quantity}
</div>


<div className="w-[20%]">
₹ {item.unitPrice}
</div>

<div className="w-[20%]">
   {item.unitPrice * item.quantity}
</div>


</div>

))

}


</div>


</div>

</div>

)
}


        </div>
    )
}

export default Sales;