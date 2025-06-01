import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
const AUD = lazy(() => import("./mainRoutes"));

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("easyGrave");
  }, [navigate]);
  return null;
};
const App = ()=>{
 return(
  <BrowserRouter>
    <Suspense fallback={<>Loading</>}>
     <Routes>
         <Route path="easyGrave/*" element={<AUD/>}/>
         <Route path="error/*" element={<></>}/>
         <Route path="*" element={<Redirect/>}/>
      </Routes>  
      </Suspense>
  </BrowserRouter>
 )
}
export default App;