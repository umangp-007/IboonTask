import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEditDetail from "../AddEditDetail/AddEditDetail";
import Table from "../../components/Table/Table";
import { DocsData } from "../../DummyData";

const Dashboard = () => {

  const [doctors, setDoctors] = useState(DocsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const doctorsPerPage = 5;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleDelete = (id) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.doctor_id !== id);
    setDoctors(updatedDoctors);

  };

  const handleEdit = (doctor) => setEditingDoctor(doctor);

  const handleSubmit = (doctor) => {
    let updatedDoctors;
    if (doctor.id) {
      updatedDoctors = doctors.map((d) => (d.id === doctor.id ? doctor : d));
    } else {
      updatedDoctors = [...doctors, { ...doctor, id: Date.now() }];
    }
    setDoctors(updatedDoctors);
    setEditingDoctor(null);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Doctor Management Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => setEditingDoctor({})}>Add New Doctor</button>
      </div>

      {editingDoctor && (
        <AddEditDetail
          doctor={editingDoctor}
          onSubmit={handleSubmit}
          onCancel={() => setEditingDoctor(null)}
        />
      )}

      <Table
        doctors={currentDoctors}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredDoctors.length / doctorsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
