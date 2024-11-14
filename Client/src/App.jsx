import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Componets/Home/Home";
import SignIn from "./Componets/Auth/SignIn";
import SignUp from "./Componets/Auth/SignUp";
import About from "./Componets/Home/About";
import Navbar from "./Componets/Layout/Navbar";
import { Footer } from "./Componets/Layout/Footer";
import { Toaster } from "react-hot-toast";
import { PrivateRouter } from "./Componets/Private/PrivateRouter";
import { Profile } from "./Componets/Private/Profile";
import SignOut from "./Componets/Auth/SignOut";
import Services from "./Componets/Home/Services";
import ContactUs from "./Componets/Home/Contactus";
import Faqs from "./Componets/Home/Faqs";
import Dashboard from "./Componets/Private/DashBoard";
import { useSelector } from "react-redux";
import Transaction from "./Componets/Private/Transaction";
import Category from "./Componets/Private/Category";

const App = () => {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <>
      <BrowserRouter>
      <div className="app-container min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">
        <Routes>
          {currentUser ? <Route path="/dashboard" element={<Dashboard/>} />: <Route path="/" element={<Home/>} />}
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/faqs" element={<Faqs/>} />
          <Route element={<PrivateRouter/>}>
            <Route path="/category" element={<Category/>}/>
            <Route path="/transaction" element={<Transaction/>}/>            
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/Signout" element={<SignOut/>} />
          </Route>
        </Routes>
        </main>
        <Footer/>
        <Toaster/>
        </div>
      </BrowserRouter>
    </>
  )
};

export default App;