import { useState } from "react"
import { useAuth } from "../../store/auth"

export const Login = () => {

    const [data, setData] = useState({adminName: "", adminEmail: "", password: "", phone:"",shopName:"", shopid: ""})
    // const {token, storeTokeninLS} = useAuth()
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        
    }
    return(
        <>
            <h1>SignUP</h1>
            <form onSubmit={handleSubmit}>
                <input name="adminName" onChange={handleChange} value={data.name} type="text" placeholder="Employee Name"/>
                <input name="adminEmail" onChange={handleChange} value={data.email} type="email" placeholder="Email Address"/>
                <input name="password" onChange={handleChange} value={data.password} type="password" placeholder="Password"/>
                <input type="number" onChange={handleChange} value={data.phone} name="phone" placeholder="Contact Number"/>
                <input type="text" onChange={handleChange} value={data.shopName} name="shopName" placeholder="Shop Name"/>
                <input name="shopid" onChange={handleChange} value={data.shopid} type="text" placeholder="shop id"/>
                <button type="submit">Signup</button>
            </form>
        </>
    )
}