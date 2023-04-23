import React,{useState,useEffect,createContext} from 'react';
import Header from './components/header/Header'
import './css/variables.css'
import { Route, Routes,useLocation} from 'react-router-dom';

import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import GetStarted from './components/sign in/GetStarted'
import LoginPage from './components/sign in/LoginPage';
import SignUp from './components/sign in/SignUp'
import Dashboard from './components/learning/Dashboard';
import Pricing from './components/pricing/Pricing';
import Questions from './components/pricing/Questions';
import Privacy from './components/terms/Privacy';
import Terms from './components/terms/Terms'
import YourPlans from './components/leaderboard/YourPlans';
import NotFound from './components/404page/NotFound'
import ResetPassword from './components/sign in/ResetPassword';
import Unauthorized from './components/404page/Unauthorized';
import VerifyPhoneNumber from './components/sign in/VerifyPhoneNumber';
import BuySucces from './components/pricing/BuySucces'
import httpClient from './httpClient';

export const GetStartedContext = createContext()

function App() {

    const [isAuthentificated,setIsAuthentificated] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    const [getStarted,setGetStarted] = useState(false)
    const [formData,setFormData] = useState({
      email:"",
      password:"",
      name:"",
      confirmPassword:"",
    })

    const toggleGetStarted = () => {
      setGetStarted(prevState => !prevState);
    };

    const location = useLocation()

    useEffect(() => {
      const checkAuthentification = async () => {
        try {
          const resp = await httpClient.get('http://localhost:5000/home/authentificated')
          
          setIsAuthentificated(resp.data.token)
        }
        catch (err) {
          setIsAuthentificated(false)
        }
      }
      checkAuthentification()
    },[])

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  

  return (
    <GetStartedContext.Provider value={{ getStarted, toggleGetStarted}} >
      <div className="App"> 
        
        {location.pathname !== '/dashboard' && 
        location.pathname !== '/login' && 
        location.pathname !== '/sign-up' && 
        location.pathname.split("/")[1] !== "reset-password" &&
        location.pathname !== "/payment-succes" &&
        <Header width = {width} isAuthentificated = {isAuthentificated}/>}
        <Routes>
          <Route path = "/" element = {<Home width = {width} isAuthentificated = {isAuthentificated}/>} />
          <Route path = '/login' element = {<LoginPage width={width}/>} />
          <Route path = '/sign-up' element = {<SignUp formData={formData}/>} />
          <Route path = "/sign-up/verify-number" element = {<VerifyPhoneNumber />} />
          <Route path= '/dashboard' element = {<Dashboard width = {width} />}/>
          <Route path = '/pricing' element = {<Pricing isAuthentificated = {isAuthentificated}/>}/>
          <Route path = '/faq' element = {<Questions />}/>
          <Route path = '/terms-of-service' element = {<Terms />}/>
          <Route path = '/privacy-policy' element = {<Privacy />} /> 
          <Route path = "/your-plans" element = {<YourPlans width={width}/>} />
          <Route path = "/your-plans/:id" element = {<YourPlans width={width}/>} />
          <Route path = "/reset-password/:id" element = {<ResetPassword />} />
          <Route path="/unauthorized" element = {<Unauthorized />} />
          <Route path="/payment-succes" element = {<BuySucces />} />
          <Route path = "*" element = {<NotFound />} />
        </Routes>
        
        {location.pathname !== '/dashboard' && 
        location.pathname !== '/login'&&
        location.pathname !== '/sign-up' &&
        location.pathname.split("/")[1] !== "reset-password" &&
        location.pathname !== "/payment-succes" &&
        <Footer />}
        <GetStarted open={getStarted} handleClose = {toggleGetStarted}/>
      </div>
    </GetStartedContext.Provider>
  )
}

export default App;
