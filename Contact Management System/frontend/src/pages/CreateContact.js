import React, { useContext, useState } from "react";
import TostContext from "../context/TostContext";

function CreateContact() {
  const { toast } = useContext(TostContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });

    const result = await res.json();

    if (!result.error) {
      console.log(result);
      toast.success(`${userDetails.name} contact created successfully`);
      setUserDetails({
        name: "",
        address: "",
        email: "",
        phone: "",
      });
    } else {
      console.log(result);
      toast.error(result.error);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="card mt-5 p-4 w-50" style={{ borderRadius: "15px" }}>
        <h2 className="card-title text-center">Create Your Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label mt-4">
              Name of the person
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              placeholder="Enter the name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addresInput" className="form-label mt-4">
              Address of the person
            </label>
            <input
              type="text"
              className="form-control"
              id="addresInput"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              placeholder="Enter the address"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label mt-4">
              Email of the person
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              aria-describedby="emailHelp"
              placeholder="Enter the email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneInput" className="form-label mt-4">
              Phone number of the person
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneInput"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              placeholder="Enter the phone number"
              required
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              className="btn btn-primary mt-4"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContact;
