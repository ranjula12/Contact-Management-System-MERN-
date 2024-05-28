import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useContext } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TostContext from "../context/TostContext";
import { Link } from "react-router-dom";

function AllContact() {
  const { toast } = useContext(TostContext);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/mycontacts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        if (!result.error) {
          setLoading(false);
          console.log(result);
          setContact(result.contacts);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("hello");

    const newSearchUser = contact.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(searchInput.toLocaleLowerCase());
    });
    console.log(newSearchUser);
    if (newSearchUser.length > 0) {
      setContact(newSearchUser);
    } else {
      toast.error("No Contact Found");
    }
  };
  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          //   setContact(contact.filter((contact) => contact._id !== id));
          setContact(result.myContacts);
          toast.success("Contact deleted successfully");
          setShowModal(false);
        } else {
          console.log(result);
          toast.error(result.error);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div>
        <h3>All Contacts</h3>
        <a href="/mycontacts" className="btn btn-danger">
          Reload Contact!
        </a>
        <hr className="my-4"></hr>
        {loading ? (
          <Spinner splash="loading contacts..." />
        ) : (
          <>
            {contact.length == 0 ? (
              <h3 style={{ textAlign: "center" }}>No Contacts Created</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search contact entering name"
                  />
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary mx-2"
                  />
                </form>
                <p className="text-muted">
                  your total contacts : <strong>{contact.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModelData({});
                          setModelData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.address}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modelData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <h3>{modelData.name}</h3> */}
          <p>
            <strong>name</strong> : {modelData.name}
          </p>
          <p>
            <strong>address</strong> : {modelData.address}
          </p>
          <p>
            <strong>email</strong> : {modelData.email}
          </p>
          <p>
            <strong>phone number</strong> : {modelData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edite/${modelData._id}`}>
            Edite Contact
          </Link>
          <Button
            className="btn btn-danger"
            onClick={() => deleteContact(modelData._id)}
          >
            Delete Contact
          </Button>
          <Button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllContact;
