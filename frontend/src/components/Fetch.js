import React, { useEffect, useState } from 'react'
import {createStore} from 'redux'


function FetchData() {
    
    // const [initState, setInitState] = useState(1);
    // const reducer = (state,action) => {
    //   switch(action.type)
    //   {
    //     case "ADD":

    //     setInitState(initState + action.payload);
    //       break;
    //     case "SUBTRACT":
    //         setInitState(initState - action.payload);
    //       break;
    //     case "MULTIPLY":
    //         setInitState(initState * action.payload);
    //       break;
    //   }
    
    //   return state;
    // }
    // useEffect(()=>{

    //     store.dispatch({
    //         type:"ADD",
    //         payload: 1
    //       });
    //       store.dispatch({
    //         type:"SUBTRACT",
    //         payload: 24
    //       });

    //       store.subscribe(()=>{
    //         console.log('updated state', store.getState())
    //       });
    // },[])
    // const store = createStore(reducer, initState );
   

    // return (
    //     <div className="App">
    //      <h1>{initState}</h1>
    //     </div>
    //   );

 }
   


export default FetchData;
