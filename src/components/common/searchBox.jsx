import React from 'react'

export default function SearchBox({value, onChange}) {
  return (
    <input 
       type = "text" 
       name ="query"
       placeholder= "Search.."
       value = {value}
       onChange={(e) => onChange(e.target.value)}
       className ="form-control  form-control-sm"
     />
  )
}
