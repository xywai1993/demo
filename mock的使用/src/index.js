
import './mock';
import axios from 'axios';


axios.get('/abc').then(data=>{
    console.log(data);
});