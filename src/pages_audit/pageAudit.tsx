import { Route, Routes } from "react-router-dom"


export const PageAudit = ()=>{
    return(
        <Routes>
            <Route path="profile" element={<></>} />
            <Route path="dashboard/*" element={<></>} />
        </Routes>
    )
}