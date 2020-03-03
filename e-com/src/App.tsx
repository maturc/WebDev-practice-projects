import * as React from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ShoppingBasket from './components/ShoppingBasket';
import Sidebar from './components/Sidebar';
import Product from './components/Product';

interface AppProps {
}
interface AppState {
  isLoading: boolean,
  products: Array<any>
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: true,
      products: []
    };
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts() {
    fetch('http://localhost:5000/products',  {method: 'GET'})
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        this.setState({
          products: myJson
        });
      });
  }
  render() {
    const productList = this.state.products.map( item =>
      <Product 
        key={item._id}
        data={item}
      />
    )
    return (
      <div className="app-wrapper">
        <header className="header">
          <Navbar />
          <SearchBar />
          <ShoppingBasket />
        </header>
        <main className="main-wrapper">
          <Sidebar />
          <section className="card-section">
            {productList}
          </section>
        </main>
      </div>
    );
  }
}

export default App;