import { Routes, Route } from "react-router-dom";

import Mint from "./component/Mint";
import Rewards from "./component/Rewards";
import Tryme from "./component/Tryme";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Main from "./component/Main";
import PrivacyPolicy from "./component/PrivacyPolicy";
import TermsAndCondition from "./component/TermsAndCondition";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="backgroundImage bg-fixed min-h-screen ">
      <Navbar />

      <Routes >
        <Route path="/" element={<Main />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/tryme" element={<Tryme />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/term" element={<TermsAndCondition />} />
      </Routes>

      <Footer></Footer>
      <Toaster />
    </div>
  );
}

export default App;
