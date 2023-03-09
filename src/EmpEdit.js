import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();

    //const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("https://blue-journalist-bbrpv.ineuron.app:4000/users/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            // idchange(resp.id);
            // namechange(resp.name);
            // emailchange(resp.email);
            // phonechange(resp.phone);
            // activechange(resp.isactive);
            idchange(resp._id);
            setFname(resp.firstName);
            setLname(resp.lastName);
            setAge(resp.age);
            setCreateAt(resp.createdAt);
            setPhoneNumber(resp.phoneNumber);
            setUpdatedAt(resp.updatedAt);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[fname,setFname]=useState("");
    const[lname,setLname]=useState("");
    const[age,setAge]=useState("");
    const[creatAt,setCreateAt]=useState("");
    const[phoneNumber,setPhoneNumber]=useState("");
    const[updatedAt,setUpdatedAt]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata=({fname,lname,age,creatAt,phoneNumber,updatedAt,active});
      

      fetch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/:${id}`+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Employee Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>FirstName</label>
                                        <input required value={fname} onMouseDown={e=>valchange(true)} onChange={e=>setFname(e.target.value)} className="form-control"></input>
                                    {fname.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>LastName</label>
                                        <input required value={lname} onMouseDown={e=>valchange(true)} onChange={e=>setLname(e.target.value)} className="form-control"></input>
                                    {fname.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input value={age} onChange={e=>setAge(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>CreatedAt</label>
                                        <input value={creatAt} onChange={e=>setCreateAt(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>PhoneNumber</label>
                                        <input value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>UpdatedAt</label>
                                        <input value={updatedAt} onChange={e=>setUpdatedAt(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-check">
                                    <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label  className="form-check-label">Is Active</label>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default EmpEdit;