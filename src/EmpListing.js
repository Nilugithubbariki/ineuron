import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/users/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/users/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://blue-journalist-bbrpv.ineuron.app:4000/users/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        fetch("https://blue-journalist-bbrpv.ineuron.app:4000/users").then((res) => {
            console.log("ShowResult",res?.data)
            return res.json();
        }).then((resp) => {
            empdatachange(resp?.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Id</td>
                                <td>FirstName</td>
                                <td>LastName</td>
                                <td>Age</td>
                                <td>CreatedAt</td>
                                <td>PhoneNumber</td>
                                <td>UpdatedAt</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.map((item)=>{
                                    return(
                                        <tr>
                                        <td>{item._id}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.age}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.updatedAt}</td>
                                        <td><a onClick={() => { LoadEdit(item._id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item._id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;