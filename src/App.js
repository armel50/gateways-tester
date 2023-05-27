
import { useState, useEffect } from "react";
import { origin , DPO_services, DPO_reqest_type} from "./constants/constants";
import uuid from "react-uuid";
function App() {

  const {REACT_APP_DPO_API,REACT_APP_DPO_TOKEN, REACT_APP_DPO_COMP_REF} = process.env
  const [payment_request, setPayment] = useState({
    "email": "",
    "first_name": "", 
    "last_name": "", 
    "address_line_1": "", 
    "address_line_2": "",
    "city": "", 
    "country": "", 
    "zip_or_postal": "", 
    "country_code": "", 
    "mobile": "",
    "payment_date": new Date(), 
    "description": "", 
    "order_ref": "", 
    "accounting_ref": "", 
    "currency": "", 
    "total": "", 
    "payment_type": "mobile",
    "card_holder_name": "", 
    "card_number": "", 
    "expiry_date": "", 
    "security_code": "",
    "mobile_money": ""

  })

  const DPO_pay= async ()=>{
    const headers = {
                      "Content-Type": "application/xml", 
                      "Accept":"application/xml",
                      "Access-Control-Allow-Origin": "*"
                    }
    const xml = `<?xml version="1.0" encoding="utf-8"?>
                  <API3G>
                    <CompanyToken>${REACT_APP_DPO_TOKEN}</CompanyToken>
                    <Request>${DPO_reqest_type.createToken}</Request>
                    <Transaction>
                      <PaymentAmount>1.00</PaymentAmount>
                      <PaymentCurrency>USD</PaymentCurrency>
                      <CompanyRef>${REACT_APP_DPO_COMP_REF}</CompanyRef>
                      <RedirectURL>${origin}</RedirectURL>
                      <BackURL>${origin}</BackURL>
                      <CompanyRefUnique>${uuid()}</CompanyRefUnique>
                      <PTL>5</PTL>
                    </Transaction>
                    <Services>
                      <Service>
                        <ServiceType>${DPO_services.test_product}</ServiceType>
                        <ServiceDescription>${payment_request.description}</ServiceDescription>
                        <ServiceDate>${new Date()}</ServiceDate>
                      </Service>
                    </Services>
                  </API3G>`
    
   fetch(REACT_APP_DPO_API, {
      method: 'POST', 
      mode: 'no-cors',
      headers: headers, 
      body:  xml
    })
    .then(rsp => console.log(rsp))
   

    
    

  }
  useEffect(()=> {
    DPO_pay()
  })
  
  
  return (
    <>

    <div className="App">

      <h1>Hello</h1>
    </div>
    </>
    
  );
}

export default App;
