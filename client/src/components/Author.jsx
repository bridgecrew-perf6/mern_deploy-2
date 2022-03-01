import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import BarChart from './BarChart';
import Chart from 'chart.js/auto';





let Author = () => {

    let [listOfAuthors, setListOfAuthors] = useState([]);
    let [changed, setChanged] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        axios.get('http://localhost:8000/api/authors')
            .then(res => {
                // console.log(res);
                res.data.result.sort((a, b) => sortAuthors(a, b));
                setListOfAuthors(res.data.result);
            })
            .catch(err => { console.log('front end- issue gettng authors', err) })
        return () => {
            controller.abort();
        }
    }, [changed])




    let deleteItem = (e) => {
        axios.delete(`http://localhost:8000/api/authors/${e}`)
            .then(res => {
                setChanged(!changed);
            })

        axios.delete(`http://localhost:8000/api/quotes/delall/${e}`)
            .then(res => {
                console.log('all quotes deleted:', res);
            })
            .catch(err => console.log('issue deleting all quotes', err))

    }

    let sortAuthors = (a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    }




    return (
        <>
            <div className="container" style={{ width: '800px' }}>
                <h1>Quotable Folks</h1>
                <div className="row"><Link to={'/new'}>Add a person and quote to our respository</Link></div>
                <div className="row ms-1">we have quotes for:</div>
                <div className="container " style={{ width: '800px' }}>
                    <div className="row" style={{ width: '500px' }}>
                        <div className="col d-flex justify-content-center bg-secondary  text-info">People</div>
                        <div className="col bg-secondary d-flex justify-content-center text-info">Actions Available</div>
                    </div>
                    {
                        listOfAuthors?.map((auth, idx) => {
                            return (

                                <div key={idx} className="row" style={{ width: '500px' }}>
                                    <div className="col " style={{ border: '1px solid black' }}>
                                        {auth.name}
                                    </div>
                                    <div className="col d-flex justify-content-center bg-secondary " style={{ border: '1px solid black' }}>
                                        <Link to={`/edit/${auth._id}`} className="px-3 me-4 btn btn-warning">Edit</Link>
                                        <Link to={`/details/${auth._id}`} className="px-2 btn btn-primary">Details</Link>
                                        <button onClick={() => { deleteItem(auth._id) }} className="px-2 ms-4 btn btn-success">Delete</button>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="row">
            <div className="col-3"> </div>
            <div className=" col-4 ms-5" >
                <BarChart changed={changed}></BarChart>               
            </div>
            <div className="col-3"></div>
</div>

        </>
    )



}

export default Author