import React from "react";
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import SlideShow from './SlideShow';
import {Link} from 'react-router-dom'




let Details =()=>{
//establish variables we will use in building this page
    let [authObj, setAuthObj] = useState({});
    let [validID,setValidID] = useState(false);
    let {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                console.log('getting author to update', res);
                if (res.data.error) {
                    setValidID(false);
                }
                else {
                    setAuthObj(res.data.result);
                    setValidID(true);
                }
            })
            .catch(err => { console.log('front end issue getting auth for update', err) })
    },[])



        

       

    return(
        <>
        {validID ?
        <>
        
            <header className="container-fluid ps-5 ms-0 d-flex" style={{backgroundColor:'#A64DFF'}}>
                <h1 className=" ps-5" style={{width:'600px', marginLeft:'75px' }}>{authObj.name}:</h1>
                <h5 className='align-self-center'><Link to={'/'} style={{color:'darkblue'}} >Return home</Link> </h5>
            </header>
            <div className="container-fluid" style={{backgroundColor:'#B3BFFF'}}>
                <div className='row'>
                    <div className="col-1"></div>
                    <div className="col-5 justify-content-center">
                        <p >Born on {moment(authObj.birthday).format('MMMM Do YYYY')} {authObj.name?.split(' ')[0]} {authObj.death==null?'is currently':'lived until the age of'}  { moment(authObj.death==null?Date.now():authObj.death).format('YYYY') - moment(authObj.birthday).format('YYYY')}. During this time {authObj.name} has provided us with some very memorable quotes, which we have preserved here </p>
                </div>
                </div>
            </div>
        
            <div className="container mt-5" style={{width:'600px' , height:'600px'} }>
                <SlideShow id={id}></SlideShow>
            </div>
            </>
        : <div>
        <h1> Sorry we cannot find the author you are looking for</h1>
        <Link to={'/'} className="btn btn-info col-5">go back to list</Link>
            </div>
        }
        </>
    )
}

export default Details;