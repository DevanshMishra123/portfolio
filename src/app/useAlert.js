import React, { useState } from 'react'

export const useAlert = () => {
  const [alert, setAlert] = useState({show: false, text: "", type: ""});
  const showAlert = ({text, type = 'danger'}) => {
    setAlert({show: true, text, type})
  }
  const hideAlert = () => {
    setAlert({show: false, text: "", type: "danger"})
  }
  return { alert, showAlert, hideAlert }
}
