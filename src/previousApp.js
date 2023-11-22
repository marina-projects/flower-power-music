// import React from 'react';
// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';
// import SignUpForm from '../SignUpForm/SignUpForm';
// import Footer from '../Footer/footer';
// import NavigationBar from '../NavigationBar/NavigationBar';
// import HomeContent from '../Home/Home';
// import './App.css';
// import PrivateRoute from '../PrivateRoute/PrivateRoute';
// import WebApp from '../../pages/WebApp';
// import LoginForm from '../Login/login';
// import { useAuth } from '../../context/AuthContext';

// function App() {
//   const { isLoading } = useAuth;

//   return (
//     isLoading ? (<h1>Loading...</h1>) :
//     (<Router>
//       <div className="App">
//         <div className="App-header"></div>
//         <NavigationBar />
//         <Routes>
//           <Route path={ROUTES.SIGN_UP} element={<SignUpForm />}></Route>
//           <Route path={ROUTES.LOGIN} element={<LoginForm />}></Route>
//           <Route path={ROUTES.WEB_APP} element={<WebApp />}></Route>
// {/* 
//           <Route path={ROUTES.WEB_APP} element={<PrivateRoute><WebApp /></PrivateRoute>}></Route> */}
//           <Route path={ROUTES.HOME} element={<HomeContent />}></Route>
//         </Routes>
//         <Footer />
//       </div>
//     </Router>)
//   );
// }

// export default App;
