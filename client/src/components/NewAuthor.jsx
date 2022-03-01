import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const NewAuthor = () => {
    let [name, setName] = useState('');
    let [hometown, setHometown] = useState('');
    let [birthday, setBirthday] = useState('');
    let [death, setDeath] = useState('');
    let [quote, setQuote] = useState('');
    let [formError, setFormError] = useState({});
    let history=useHistory();



    let addAuthor = (e,callBack) => {
        e.preventDefault()
        let authorObj = { name, hometown,birthday,death };
        axios.post('http://localhost:8000/api/authors', authorObj)
            .then(res => {
                if(res.data.error){
                    // console.log(res.data.error);
                    console.log(res["data"]["error"]);
                    setFormError(res.data.error);
                }
                else{
                    console.log(res);
                    callBack(res.data.result);
                    history.push('/')
                }
            })
            .catch(err => { console.log("attempt to add failed", err) })
        
    }

    let addQuote = (response)=>{
        let quoteObj = {
            auth_id:response._id,
            message:quote
        }

        axios.post('http://localhost:8000/api/quotes',quoteObj)
        .then(res=>{
            console.log('Front End - adding quote',res);
        })
        .catch(err=>{console.log('Front End - error adding quote',err)})

    }

    return (
        <form onSubmit={(e)=>addAuthor(e,addQuote)} className="container col-6 justify-content-center gap-1">
            <h1>Quotable Folks</h1>
            {/* <Link to={'/'}>Home</Link> */}
            <label htmlFor="">Add to repository:</label>
            
                <div className="row mb-2">
                    <label className='col-2 text-start'>Name:</label>
                    <input type="text" name="name" id="" className="col-6" onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="row justify-content-center text-danger">{formError?.errors?.name?.message}</div>
                <div className="row mb-2">
                    <label className='col-2 text-start'>Home Town:</label>
                    <input type="text" name="hometown" id="" className="col-6" onChange={(e) => { setHometown(e.target.value) }} />
                </div>
                <div className="row justify-content-center text-danger">{formError?.errors?.hometown?.message}</div>
                <div className="row mb-2">
                    <label className='col-2 text-start'>Birthday:</label>
                    <input type="date" name="birthday" id="" className="col-6" onChange={(e) => { setBirthday(e.target.value) }} />
                </div>
                <div className="row justify-content-center text-danger">{formError?.errors?.birthday?.message}</div>
                <div className="row mb-2">
                    <label className='col-2 col-auto text-start'>Death:</label>
                    <input type="date" name="death" id="" className="col-6" onChange={(e) => { setDeath(e.target.value) }} />
                </div>
                <div className="row mb-2">
                    <label className='col-2 text-start'>Quote:</label>
                    <textarea name="quote" id="" className="col-6" style={{ height: "100px" }} onChange={(e) => { setQuote(e.target.value) }} />
                </div>
                <div className="row justify-content-center" style={{width:'650px'}}>
                    <button  type="submit" className="btn btn-success col-2 me-4">submit</button>
                    <Link to={'/'} className="btn btn-info col-2">Cancel</Link>
                </div>
        </form>
    )
}

export default NewAuthor;