import { Suspense, lazy, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { userExits, userNotExits } from './redux/reducer/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import { getUser } from './redux/api/userAPI';
import { UserReducerInitialState } from './types/reducer-types';

import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Search from './pages/Search';

import ProtectedRoute from './components/ProtectedRoute';
import Working from './pages/Home/Working';


const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import('./pages/Login'));

// Campaigns
const NewCampaign = lazy(() => import('./pages/Campaigns/CampaignCreate'));
const Fundraisers = lazy(() => import('./pages/Campaigns/Campaigns'));
const CampaignDetails = lazy(() => import('./pages/Campaigns/CampaignDetails'));

// Profiles
const MyDonations =  lazy(() => import('./pages/Profile/MyDonations'));
const MyFundraisers = lazy(() => import('./pages/Profile/MyFundraisers'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

// Transaction
const Checkout = lazy(() => import('./pages/Checkout'));


// Admin Routes Components
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Campaigns = lazy(() => import("./pages/admin/campaigns"));
const Customers = lazy(() => import("./pages/admin/users"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newcampaign"));
const ProductManagement = lazy(() => import("./pages/admin/management/productmanagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement"));


const App = () => {

  const {user, loading} = useSelector((state: {userReducer : UserReducerInitialState}) => state.userReducer)

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        const data = await getUser(user.uid);
        dispatch(userExits(data.user));
      }
      else dispatch(userNotExits());
    });
  }, [])
  

  return (
    // loading ? <Loader /> : 
    <BrowserRouter>
    
    {/* Navbar */}
    <Navbar user={user} />
    
    <Suspense fallback={<Loader />}>
    <Routes>

      {/* Home Routes */}
        <Route path='/' element={<Home />}  />
        <Route path='/search' element={<Search />}  />
        <Route path='/working' element={<Working />} />



        {/* Campaign Routes */}
        <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>

          <Route path='/campaigns' element={<Fundraisers />} />
          <Route path='/campaigns/create' element={<NewCampaign />} />
          <Route path='campaigns/:id' element={<CampaignDetails />} />

        </Route>


        {/* Profile Routes */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/fundraisers' element={<MyFundraisers />} />
        <Route path='/profile/donations' element={<MyDonations />} />

        {/* Not Loged in route */}
        <Route path='/login' element={<ProtectedRoute isAuthenticated={user ? false : true}>
          <Login />
        </ProtectedRoute>} />

        {/* Login User Route */}
        <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
          <Route path='/checkout' element={<Checkout />} />
        </Route>


        

        {/* Admin Routes */}

        <Route 
          element={<ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={user?.role==="admin" ? true : false} />} 
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/campaign" element={<Campaigns />} />
          <Route path="/admin/user" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />

          {/* Charts */}
          <Route path="/admin/chart/bar" element={<Barcharts />} />
          <Route path="/admin/chart/pie" element={<Piecharts />} />
          <Route path="/admin/chart/line" element={<Linecharts />} />

          {/* Apps */}
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/toss" element={<Toss />} />

          {/* Management */}
          <Route path="/admin/campaign/new" element={<NewProduct />} />
          <Route path="/admin/campaign/:id" element={<ProductManagement />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
        </Route>;

      </Routes>

      </Suspense>
      <Toaster position='bottom-center' />
    </BrowserRouter>
  )
}

export default App