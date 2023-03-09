import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmpDetail = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("https://blue-journalist-bbrpv.ineuron.app:4000/users/" + empid).then((res) => {
            console.log("Respect",res)
            return res.json();
           
        }).then((resp) => {
           
            empdatachange(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Employee Create</h2>
                </div>
                <div className="card-body"></div>

                {empdata &&
                    <div>
                        <h2>The Employee FirstName is : <b>{empdata.name}</b>  ({empdata._id})</h2>
                        {
                            console.log("Hello",empdata.name)
                        }
                        <h3>Contact Details</h3>
                        <h5>LastName : {empdata.lastName}</h5>
                        <h5>PhoneNumber is : {empdata.phoneNumber}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default EmpDetail;