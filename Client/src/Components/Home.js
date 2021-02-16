// This is a test file for the backend blog connection

import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../SupCt_Singapore_01_old.jpg"

const Home = props => {
    useEffect(() => {
      axios.get('/api/hello')
        .then(res => setState(res.data))
    }, [])

    const [state, setState] = useState('')

  return(
    <main>
      <img 
        src={image} 
        alt="Old SupCt Building Singapore 01"
        className="absolute object-cover w-full h-full"
      />
      <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
        <h1 className="text-3lg text-green-100 font-bold cursive leading-none lg:leading-snug home-name">
        Asian NonGovernmental Organization
        </h1>
        <p>{state}</p>
      </section>
    </main>
  )
};

export default Home;