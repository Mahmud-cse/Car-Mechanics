import React, { useEffect, useState } from 'react';

const ManageService = () => {
    const [services,setServices]=useState([]);
    useEffect(()=>{
        fetch('https://lit-woodland-68938.herokuapp.com/services')
        .then(res=>res.json())
        .then(data=>setServices(data));
    },[]);

    const handleDelete=(id)=>{
        const url=`https://lit-woodland-68938.herokuapp.com/services/${id}`;
        fetch(url,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount){
                alert("Successfully deleted");
                const remaining=services.filter(service=>service._id!==id);
                setServices(remaining);
            }
        })
    }

    return (
        <div>
            <h2>Manage Services</h2>
            {
                services.map(value=><div key={value._id}>
                    <h3>{value.name}</h3>
                    <button onClick={()=>handleDelete(value._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageService;