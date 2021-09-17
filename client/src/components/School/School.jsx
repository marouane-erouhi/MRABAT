import React, { useEffect, useState } from 'react'
import './styles.css'
import { useHistory } from "react-router-dom";

export default function School(data) {
  const { name, about, location, imageUrl, admission } = data
  const history = useHistory()

  const editSchool = (e) => {
    history.push("/new-school", { ...data });

  }

  return (
    <div className="school">
      <div className='image'>
        <img width="150" src={imageUrl} alt="school image" />
      </div>
      <div className="body">
        <h2>{name}</h2>
        <p>{about}</p>
        <p>Location: {location}</p>
        <p>Admission: {admission}</p>
        <button onClick={editSchool}>Update</button>
      </div>
    </div>
  )
}