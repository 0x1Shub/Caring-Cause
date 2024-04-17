import { Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Loader from './components/Loader';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import MyFundraisers from './pages/MyFundraisers';
const MyDonations =  lazy(() => import('./pages/Profile/MyDonations'));




const Home = lazy(() => import("./pages/Home/Home"));
const NewCampaign = lazy(() => import('./pages/NewCampaign'));
const Fundraisers = lazy(() => import('./pages/Fundraisers'));

const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));

// Admin routed importing
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);


const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Suspense fallback={<Loader />}>
    <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/search' element={<Search />}  />
        <Route path='/campaigns/create' element={<NewCampaign />} />

        <Route path='/fundraisers' element={<Fundraisers />} />

        {/* Profile Routes */}
        <Route path='/profile/fundraisers' element={<MyFundraisers />} />
        <Route path='/profile/donations' element={<MyDonations />} />

        {/* Not Loged in route */}
        <Route path='/login' element={<Login />} />

        {/* Login User Route */}
        <Route>
          <Route path='/checkout' element={<Checkout />} />
        </Route>


        

        {/* Admin Routes */}

        <Route 
          // element={<ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />} 
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customer" element={<Customers />} />
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
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
        </Route>;

    </Routes>

    </Suspense>
      
    </BrowserRouter>
  )
}

export default App