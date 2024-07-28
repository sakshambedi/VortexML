import React from 'react';
import Navbar from './components/navbar/navbar';
import Body from './components/body'
import Footer from './components/footer/footer'


export const App = () => {
  return (
    <>
      <div class="navbar">
        <Navbar />
      </div>
      <div>
        <Body />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};


export default App;
