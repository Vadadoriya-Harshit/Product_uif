import { Route, Routes } from "react-router-dom"
import { ProtectedRoutes } from "./auth/protectedRoutes"
import { PageAudit } from "./pages_audit/pageAudit"

const EntryPoint = ()=>{
    return(
        <Routes>
        <Route path="login" element={<></>} />
        <Route path="register" element={<></>} />
        <Route
          path="*"
          element={
            <ProtectedRoutes>
                <PageAudit/>
            </ProtectedRoutes>
          }
        />
      </Routes>
    )
}
export default EntryPoint;