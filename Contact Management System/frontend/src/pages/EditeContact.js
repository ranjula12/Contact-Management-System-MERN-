import React, { useContext, useEffect, useState } from "react";
import TostContext from "../context/TostContext";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
function EditeContact() {
  const navigator = useNavigate();
  const { toast } = useContext(TostContext);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const { id } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/api/contact", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });

    const result = await res.json();

    if (!result.error) {
      console.log(result);
      toast.success(`${userDetails.name} contact updated successfully`);
      setUserDetails({
        name: "",
        address: "",
        email: "",
        phone: "",
      });
      navigator("/mycontacts", { replace: true });
    } else {
      console.log(result);
      toast.error(result.error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        if (!result.error) {
          console.log(result);
          setUserDetails({
            name: result.name,
            address: result.address,
            email: result.email,
            phone: result.phone,
          });
          setLoading(false);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, [id]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {loading ? (
        <Spinner splash="loading contacts...." />
      ) : (
        <div className="card mt-5 p-4 w-50" style={{ borderRadius: "15px" }}>
          <h2>Edite your contact</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nameInput" class="form-label mt-4">
                Name of the person
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                // aria-describedby="emailHelp"
                placeholder="enter the name"
                required
              />
            </div>
            <div>
              <label htmlFor="addresInput" class="form-label mt-4">
                Address of the person
              </label>
              <input
                type="text"
                className="form-control"
                id="addresInput"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                // aria-describedby="emailHelp"
                placeholder="enter the address"
                required
              />
            </div>
            <div>
              <label htmlFor="emailInput" class="form-label mt-4">
                email of the person
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
                placeholder="enter the email"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneInput" class="form-label mt-4">
                phone number of the person
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                // aria-describedby="emailHelp"
                placeholder="enter the phone number"
                required
              />
            </div>
            <input
              type="submit"
              value={"save changes"}
              className="btn btn-primary my-2"
            ></input>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditeContact;
