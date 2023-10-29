import React, { useEffect, useState} from 'react'
import axios from '../api/axios';

function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
      axios.get('/test')
      .then(response => {
          setData(response.data);
        //   console.log(data)
      }).catch(error => {
          console.error('Error:', error);
      });},[]);
  
  return (
  <>
  {data}
  </>

  
  
  )
}

export default Test