// import { useNavigate } from 'react-router-dom';
import './App.css';
import { BrowserRouter,Routes,Route }  from 'react-router-dom'
import MainPage from './components/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import AddItem from './components/AddItem';
import BuyItems from './components/BuyItems';
import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';


function App() {
  return (
    <>
      <BrowserRouter>
      <div>
      <Routes>
        {/* <Route path="/" element={<RegisterAndLogin/>}/> */}
        {/* <Route path="/home" element={<HomeScreen/>}/> */}
        {/* <Route path="/reset" element={<ForgotPassword/>} /> */}
        <Route path="/" element={<MainPage/>} />
        {/* <Route path="/livefeed/:exerciseType" element={<LiveFeed/>} /> */}
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/" element={<MainPage/>} />
        <Route path="/add-item" element={<AddItem/>} />
        <Route path="/buy-items" element={<BuyItems/>} />
        <Route path="/item/:itemId" element={<ItemDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        
      </Routes>

      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
