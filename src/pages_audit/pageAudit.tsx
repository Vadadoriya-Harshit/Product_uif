import { Route, Routes } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"


export const PageAudit = ()=>{
    return(
        <Fragment>
        <Routes>
            <Route path="profile" element={<></>} />
            <Route path="dashboard/*" element={<></>} />
        </Routes>
        </Fragment>
    )
}