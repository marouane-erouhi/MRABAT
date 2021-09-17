import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { getAllSchools } from '../../helpers/school'
import School from '../School/School';

import './styles.css'

export default function Home() {
  const [schools, setSchools] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = e => {
    getAllSchools().then((data) => {
      console.log(data)
      setSchools(data.schools)
    })
  }

  return (
    <div>
      <Link className="create-button" to="/new-school">Create new School</Link>

      <h3>All Schools</h3>
      <div className="all-schools">
        {schools.map(school => {
          return <School key={school.name} {...school} />
        })}
      </div>
    </div>
  )
}