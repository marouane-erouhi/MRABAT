import React, { useState } from 'react'
import './styles.css'
import './loader.css'

import { Formik } from 'formik';

import { addSchool, updateSchool } from '../../helpers/school'
import { useHistory } from "react-router-dom";

export default function SchoolForm() {
  const history = useHistory();
  const [failed, setFailed] = useState({ value: false, text: "" })

  console.log(history.location.state)
  const historyState = history.location.state

  let initialValues = {
    schoolName: '',
    about: '',
    admission: '',
    location: '',
  }

  if (historyState) {
    initialValues = {
      schoolName: historyState.name || '',
      about: historyState.about || '',
      admission: historyState.admission || '',
      location: historyState.location || ''
    }
  }


  const createSchool = async (values, { setSubmitting }) => {
    setSubmitting(true)
    const response = await addSchool(values)
    if (response.success) {
      // go back to main page, tell the user
      history.push("/");
    } else {
      setFailed({ value: true, text: "A school with that name is already present" })
      //reset after 3s
      setTimeout(function () { setFailed({ value: false, text: "" }) }, 3000);
    }
    setSubmitting(false)
  }

  const updateSchoolInfo = async (values, { setSubmitting }) => {
    setSubmitting(true)

    const response = await updateSchool(historyState.name, values, values.images)
    if (response.success) {
      // go back to main page, tell the user
      history.push("/");
    } else {
      setFailed({ value: true, text: "A school by that name thosen't exists" })
      //reset after 3s
      setTimeout(function () { setFailed({ value: false, text: "" }) }, 3000);
    }
    setSubmitting(false)
  }

  return (
    <div className="new-school-form">
      <h1>Add a School</h1>

      {failed.value && <h2 className="failed-popup">{failed.text}</h2>}

      <Formik
        initialValues={{ ...initialValues, images: '' }}
        onSubmit={historyState ? updateSchoolInfo : createSchool}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="img">Select image:</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={(event) => {
              setFieldValue("images", event.currentTarget.files[0]);
            }} />

            <label htmlFor="schoolName">School name:</label>
            <input id="schoolName" value={values.schoolName} onChange={handleChange} />

            <label htmlFor="about">About:</label>
            <textarea id="about" name="about" rows="4" cols="50" value={values.about} onChange={handleChange} ></textarea>

            <label htmlFor="location">Location:</label>
            <textarea id="location" name="location" rows="4" cols="50" value={values.location} onChange={handleChange} ></textarea>

            <label htmlFor="admission">Admission:</label>
            <textarea id="admission" name="admission" rows="4" cols="50" value={values.admission} onChange={handleChange} ></textarea>

            <button className="submit-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ?
                <div style={{ fontSize: '24px' }} className="lds-facebook"><div></div><div></div><div></div></div>
                : 'Submit'
              }
            </button>
          </form>
        )}

      </Formik>

    </div>
  )
}