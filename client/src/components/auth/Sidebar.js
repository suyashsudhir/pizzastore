import React, {useState} from 'react';

const Sidebar = ({activeValue}) => {
    const [active, setActive] = useState("orders");
    const handleClick = (value) => {
        setActive(value);
        activeValue(value)
    }
    return(
        <div className="sidebar-container">
            <span className={`sidebar-link ${active === 'orders' ?'active':''}`}  onClick={()=> handleClick("orders")}>Your Orders</span>
            <span className={`sidebar-link ${active === 'general' ?'active':''}`}  onClick={()=> handleClick('general')}>General</span>
            <span className={`sidebar-link ${active === 'security' ?'active':''}`}  onClick={()=> handleClick('security')}>Security</span>
        </div>
    )
}
export default Sidebar;