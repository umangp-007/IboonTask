/* eslint-disable react/prop-types */
const Table = ({ doctors, onDelete, onEdit }) => {
    return (
      <table>
        <thead>
          <tr>
          <th>Doctor ID</th>
            <th>Name</th>
            <th>NPI Number</th>
            <th>Username</th>
            <th>Doctor Type</th>
            <th>Sales Rep</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.doctor_id}>
              <td>{doctor.doctor_id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.NPI_Number}</td>
              <td>{doctor.username}</td>
              <td>{doctor.doctore_Type}</td>
              <td>{doctor.sales_rep}</td>
              <td>{doctor.admin === true ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => onEdit(doctor)}>Edit</button>
                <button onClick={() => onDelete(doctor.doctor_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  
  export default Table