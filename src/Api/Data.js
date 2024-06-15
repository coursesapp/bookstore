import axios from 'axios'
import Cookies from 'js-cookie';

export default async function(path,data,method){

    let jsondata = JSON.stringify(data);
    const token = Cookies.get('token');

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: `http://mkanak.runasp.net/api/${path}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      data : jsondata
    };

    return axios.request(config)
    .then((response) => {
      console.log(response);
      return (response)
    })
    .catch((error) => {
      console.log(error);
      return(error);
    });

}
