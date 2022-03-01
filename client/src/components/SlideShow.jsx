import React from 'react';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption,
} from 'mdb-react-ui-kit';
import {useState, useEffect} from 'react';
import axios from 'axios';


export default function SlidShow(props) {
        let [imgLocation, setImgLocation] = useState(['https://wallpapercave.com/wp/7vLMRNQ.jpg','https://www.pixelstalk.net/wp-content/uploads/2016/11/Calm-Full-HD-Wallpaper.jpg','https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp','https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp','http://counselingbytasha.com/wp-content/uploads/2018/07/calm.jpg','http://saskedge.ca/wp-content/uploads/2015/01/The_calm_after_the_storm_-_Port_Lincoln_-_South_Australia_Explored.jpg'])
        let [quoteObjList, setQuoteObjList] = useState([]);


        useEffect(()=>{

            axios.get(`http://localhost:8000/api/quotes/auth/${props.id}`)
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

      

        },[])


        let sayWhat= async (idx)=>{
            let synth=window.speechSynthesis;
            let sayThis= new SpeechSynthesisUtterance();
            let voice =  synth.getVoices();
            
            sayThis.voice = voice[23];
            sayThis.text=quoteObjList[idx].message;
            synth.speak(sayThis);
            
        }


    return (
        <MDBCarousel showIndicators showControls fade>
            <MDBCarouselInner>
                {
                    quoteObjList.map((quoteObj,idx)=>{
                        return(
                        <>
                            
                            <MDBCarouselItem key={idx} className={idx === 0 ? "active" : ""}>
                            
                                <MDBCarouselElement src={imgLocation[idx%(imgLocation.length-1)]} alt='...' style={{width:'1320px', height:'253px'}} />
                                <MDBCarouselCaption>
                                    <h5 onClick={()=>sayWhat(idx)}  style={{cursor:'pointer'}}>..And so it was said:</h5>
                                    <p style={{fontFamily:'Georgia'}}>"{quoteObj.message}"</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem> 
                            
                        </> 
                        )
                    })
                }
            </MDBCarouselInner>
        </MDBCarousel>
    );
}