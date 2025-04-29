import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div id="footer">
      <h6>© 2024 GasBooker. All rights reserved.</h6>
      <div style={{display:"flex",gap:"3rem"}}>
        <p>Terms of Service</p>
        <p>Privacy</p>
      </div>
    </div>
  )
}

export default Footer
