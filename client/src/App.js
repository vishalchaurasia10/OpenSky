import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import FileUpload from './components/FileUpload';
import ContractState from './context/contract/ContractState';
import AccountState from './context/account/AccountState';
import ProviderState from './context/provider/providerState';

function App() {

  return (
    <>
      <div className="main bg-black text-white">
        <ContractState>
          <ProviderState>
            <AccountState>
              <BrowserRouter>
                <NavBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/mint_as_nft" element={<FileUpload />} />
                </Routes>
              </BrowserRouter>
            </AccountState>
          </ProviderState>
        </ContractState>
      </div>
    </>
  );
}

export default App;