import {useEffect, useState} from "react"
import { Trash2 } from "react-feather"
import {deleteCustomer, getAllCustomer, saveCustomer, updateCustomer} from "../reducer/CustomerReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {Customer} from "../models/Customer.ts";
import {AppDispatch} from "../store/store.tsx";

function CustomerPage() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false)

  const customer = useSelector((state) => state.customer || []);

  useEffect(() => {
      getAllCustomers();
  });

  const getAllCustomers = async () => {
      await dispatch(getAllCustomer());
  }

  const handleAdd = () => {
    if (!id || !name || !address || !email) {
      alert("All fields are required!")
      return
    }
    // setCustomers([...customers, { id, name, address, email}])
    const newCustomer = new Customer(id, name, address, email);
    dispatch(saveCustomer(newCustomer));
    getAllCustomers();
    resetForm()
  }

  const handleEdit = (customer: any) => {
    setId(customer.customerId);
    setName(customer.name);
    setAddress(customer.address);
    setEmail(customer.email);
    // setPhone(customer.phone)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!id || !name || !address || !email) {
      alert("All fields are required!")
      return
    }
    const updateCustomerDetails = new Customer(id,name,address,email);
    dispatch(updateCustomer(updateCustomerDetails));
    resetForm()
  }

  const handleDelete = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
        dispatch(deleteCustomer(customerId));
    }
  }

  const resetForm = () => {
    setId("")
    setName("")
    setAddress("")
    setEmail("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Add
          </button>
        )}
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((customers : Customer) => (
            <tr
              key={customers.customerId}
              onClick={() => handleEdit(customers)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{customers.customerId}</td>
              <td className="border px-4 py-2">{customers.name}</td>
              <td className="border px-4 py-2">{customers.address}</td>
              <td className="border px-4 py-2">{customers.email}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(customers.customerId)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerPage
