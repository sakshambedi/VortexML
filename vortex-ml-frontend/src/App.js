
import Navbar from './components/navbar/navbar';
import Body from './components/body'
import Footer from './components/footer/footer'


export const Index = () => {
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


export default Index;
