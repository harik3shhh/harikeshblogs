import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=> {
        const interval = setInterval(()=> {
            setCount((prevValue)=> --prevValue)
        }, 1000)
        count === 0 && navigate(`/${path}`,{
            state: location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path])

    return (
        <>
            <div style={{height: "100vh", display:"flex", alignItems: "center",flexDirection: "column", justifyContent:"center", background: "rgb(233, 225, 238)"} }>
                <h1 style={{color:"red"}}>Unauthorized Access</h1>
                <h2 className='Text-center'>Redirecting to you in {count} second</h2>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner