import { Route, Routes } from "react-router-dom"
import { ProtectedRoutes } from "./auth/protectedRoutes"
import { PageAudit } from "./pages_audit/pageAudit"
import { Fragment } from "react/jsx-runtime"
import { AuthProvider } from "./context/AuthContext"
import { LoginAuthController } from "./components/Loaders/login/loginController"
import SignInSide from "./components/Loaders/login/SignInSide"
// import { SignUpController } from "./components/Loaders/login/Register"
const EntryPoint = ()=>{
    return(
      <Fragment>
        <AuthProvider>
        <Routes>
        <Route path="login" element={<SignInSide/>} />
        {/* <Route path="register" element={<SignUpController/>} /> */}
        <Route
          path="*"
          element={
            <ProtectedRoutes>
                <PageAudit/>
            </ProtectedRoutes>
          }
        />
      </Routes>
      </AuthProvider>
      </Fragment>
    )
}
export default EntryPoint;