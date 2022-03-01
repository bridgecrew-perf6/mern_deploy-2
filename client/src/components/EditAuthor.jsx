import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import moment from 'moment';


const EditAuthor = () => {

    let [quoteObjList, setQuoteObjList] = useState([]);
    let [newQuoteObjList, setNewQuoteObjList] = useState([]);
    let [authObj, setAuthObj] = useState({});
    let [formError, setFormError] = useState({});
    let history = useHistory();
    let { id } = useParams();
    let [validID, setValidID] = useState(false);
    let [finalPath,setFinalPath]=useState('auth');
    let [delQuote,setDelQuote] = useState(false)


    //******************************************************************************** */
    // grab information about quotes and quote Authors set state of page accordingly
    //******************************************************************************** */
    useEffect(() => {
        // console.log(id);
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

        axios.get(`http://localhost:8000/api/quotes/auth/${id}`)
            .then(res => {
                console.log('getting quotes for an author', res);
                if (res.data.error) {
                    console.log('invaid author no quotes to pull');
                }
                else {
                    setQuoteObjList(res.data.result)
                }
            })
            .catch(err => console.log('front end error getting quotes', err))

    }, [id,delQuote])

    //******************************************************************************** */
    // upon submission properly direct update and post requtess for quotes and quote authors
    //******************************************************************************** */
    let updateInfo = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/authors/${id}`, authObj)
            .then(res => {
                if (res.data.error) {
                    // console.log(res.data.error);
                    console.log(res.data.error);
                    setFormError(res.data.error);
                }
                else {
                    console.log(res);
                    if(finalPath=='auth'){
                        history.push('/');
                    }         
                }
            })
            .catch(err => { console.log("attempt to add failed", err) })
        
        //update original quotes associated with the Author
        axios.put(`http://localhost:8000/api/quotes/${id}`,quoteObjList)
        .then(res=>{ 
            console.log('front end updating orig quotes',res);
            if(finalPath=='quote'){
                history.push('/');
            }
            
        })
        .catch(err=>{console.log('front end error updating quotes',err)})

        //add new quotes if any provided
        axios.post('http://localhost:8000/api/nquotes',newQuoteObjList)
        .then(res=>{
            console.log('Front End - adding quote',res);
            if(finalPath=='nquote'){
                history.push('/');
            }
            
        })
        .catch(err=>{console.log('Front End - error adding quote',err)})

    }

    //******************************************************************************** */
    //handel changes in form that update/delete original quote(s) and info about author. 
    //adjust states accordingly
    //******************************************************************************** */

    let updateAuthorInfo = (e) => {
        setAuthObj({
            ...authObj,
            [e.target.name]: e.target.value
        })
    }

    let updateQuoteInfo = (e,idx) => {
        let cpList=[...quoteObjList];
        cpList[idx].message=e.target.value;
        setQuoteObjList(cpList)
        if(finalPath!='nquote'){
            setFinalPath('quote');
        }
    }

    let deleteOrigQuote = async (e,_id)=>{
        e.preventDefault();
        try {
        let  res =  await axios.delete(`http://localhost:8000/api/quotes/${_id}`)
            console.log('deleting orig quote',res);
            setDelQuote(!delQuote);
        }
        catch (err){
            console.log(' front End - something wwent wrong deleting',err);
        }
        
    }

    //******************************************************************************** */
    //handel adding/deleting new inputs for quotes and updating them accordingly 
    //******************************************************************************** */
    let addQuoteInput = (e)=>{
        e.preventDefault();
        setNewQuoteObjList([...newQuoteObjList,{message:'',auth_id:id}]);      
    }
    let deleteQuoteInput= (e, idx)=>{
        e.preventDefault();
        let cplist = newQuoteObjList;
        cplist.splice(idx,1);        
        setNewQuoteObjList([...cplist]);
        if(cplist==[]){
            setFinalPath('quote');
        }
    }
    
    let updateNewQuoteInfo =(e,idx)=>{
        let cpList=[...newQuoteObjList];
        cpList[idx].message=e.target.value;
        setNewQuoteObjList(cpList)
        setFinalPath('nquote');
    }


    return (

        <>
            {validID ?
                <form onSubmit={updateInfo} className="container col-6 justify-content-center">
                    <h1>Quotable Folks</h1>
                    {/* <Link to={'/'}>Home</Link> */}
                    <label htmlFor="">Edit repository:</label>

                    <div className="row mb-2">
                        <label className='col-2 text-start'>Name:</label>
                        <input type="text" name="name" id="" className="col-6" value={authObj.name} onChange={(e) => { updateAuthorInfo(e) }} />
                    </div>
                    <div className="row justify-content-center text-danger">{formError?.errors?.name?.message}</div>
                    <div className="row mb-2">
                        <label className='col-2 text-start'>Home Town:</label>
                        <input type="text" name="hometown" id="" className="col-6" value={authObj.hometown} onChange={(e) => { updateAuthorInfo(e) }} />
                    </div>
                    <div className="row justify-content-center text-danger">{formError?.errors?.hometown?.message}</div>
                    <div className="row mb-2">
                        <label className='col-2 text-start'>Birthday:</label>
                        <input type='date' name="birthday" id="" className="col-6" value={moment(authObj.birthday).format("YYYY-MM-DD")} onChange={(e) => { updateAuthorInfo(e) }} />
                    </div>
                    <div className="row justify-content-center text-danger">{formError?.errors?.birthday?.message}</div>
                    <div className="row mb-2">
                        <label className='col-2 col-auto text-start'>Death:</label>
                        <input type="date" name="death" id="" className="col-6" value={moment(authObj.death).format("YYYY-MM-DD")} onChange={(e) => { updateAuthorInfo(e) }} />
                    </div>
                    <div className="row justify-content-center mb-4" style={{ width: '650px' }}>
                        <button type="submit" className="btn btn-success col-2 me-4">Submit</button>
                        <Link to={'/'} className="btn btn-info col-2">Cancel</Link>
                        <button onClick={(e)=>addQuoteInput(e)} className="btn btn-warning col-3 ms-4">Add a Quote</button>
                    </div>
                    {
                        newQuoteObjList?.map((aQuote,idx)=>{
                            return(
                                <div key={idx} className="row mb-2">
                                    <label className='col-2 text-start'>{`Quote :${quoteObjList.length+1+idx}`}</label>
                                    <textarea name="nquote" id="" style={{ height: "100px" }} className="col-6" style={{ height: "60px" }} value={aQuote.message} onChange={(e) => { updateNewQuoteInfo(e,idx) }} />
                                    <button onClick={(e)=>deleteQuoteInput(e,idx)} className="btn btn-danger align-self-center ms-2 p-0" style={{ width: '80px', height: '30px' }}>Delete</button>

                                </div>

                            )
                        })
                    }
                    {
                        quoteObjList?.map((aQuote, idx) => {
                            return (
                                <div key={idx} className="row mb-2">
                                    <label className='col-2 text-start'>{`Quote : ${idx + 1}`}</label>
                                    <textarea name="quote" id="" style={{ height: "100px" }} className="col-6" style={{ height: "60px" }} value={aQuote.message} onChange={(e) => { updateQuoteInfo(e,idx) }} />
                                    <button onClick={(e)=>deleteOrigQuote(e,aQuote._id)} className="btn btn-danger align-self-center ms-2 p-0" style={{ width: '80px', height: '30px' }}>Delete</button>

                                </div>
                            )
                        })
                    }

                </form>
                : <div>
                    <h1> Sorry we cannot find the author you are looking for</h1>
                    <Link to={'/'} className="btn btn-info col-5">go back to list</Link>
                </div>
            }
        </>

    )
}

export default EditAuthor;