var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
    //1.创建阶段
    getDefaultProps:function() {
        //console.log("getDefaultProps");
        return {};
    },

  
  handleClick(e) {
        //console.log(e.target); //logs Observer class instance
         //alert(e);
         console.log(this.refs);
  },
  render: function() {
    var name =this.props.product.name;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
        <td><button onClick={this.handleClick.bind(this)}>Click</button></td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
    //2.实例化阶段
    getInitialState:function() {
        //console.log("getInitialState");
        return {jsonData:[],TestPath:''};
    },  
    //render之前调用，业务逻辑都应该放在这里，如对state的操作等
    componentWillMount:function() {
       this.state.jsonData =this.props.products;
       this.state.TestPath = 'test';
    },  
    componentDidMount:function() {
        console.clear();
    },
    handleClick:function(e){
      console.log(this.state.TestPath);
    },
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.map(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
        <tr><td colSpan='3'><button onClick={this.handleClick.bind(this)}>Click</button></td></tr>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
            onChange={this.handleChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});


var PRODUCTS = [
  {index:1, category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {index:6, category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {index:3, category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {index:2, category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {index:4, category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {index:5, category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
