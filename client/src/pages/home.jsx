import { useState } from "react"

export const Home = () => {

    const [data, setData] = useState({name: "", email: "", password: "", phone:"", shopid: ""})
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }
    return(
        <>
            <h1>SignUP</h1>
            <form >
                <input name="name" onChange={handleChange} value={data.name} type="text" placeholder="Employee Name"/>
                <input name="email" onChange={handleChange} value={data.email} type="email" placeholder="Email Address"/>
                <input name="password" onChange={handleChange} value={data.password} type="password" placeholder="Password"/>
                <input type="number" onChange={handleChange} value={data.phone} name="phone" placeholder="Contact Number"/>
                <input name="shopid" onChange={handleChange} value={data.shopid} type="text" placeholder="shop id"/>
                <button type="submit">Signup</button>
            </form>
        </>
    )
}