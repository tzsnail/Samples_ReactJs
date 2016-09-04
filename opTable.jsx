var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    );
  },
  render: function() {
    return (
      <div>
        <input type="text" placeholder="Search..." value={this.props.filterText} 
          ref="filterTextInput" onChange={this.handleChange}
        />
       </div> 
    );
  }
});

var ProductRow = React.createClass({
    //1.创建阶段
    getDefaultProps:function() {
        //console.log("getDefaultProps");
        return {};
    },
  handleSelect(e) {
        //console.log(e.target); //logs Observer class instance
         //alert(e);
         //console.log(this.props.product);
         //this.props.Child_AddNewBar.refs.piName = this.props.product.name;
         //this.props.Child_AddNewBar.refs.piPrice = this.props.product.price;
         //console.log(this.props.refs.Child_AddNewBar);
         console.log("select row");
         this.props.onSelectRow(this.props.product);
  },
  render: function() {
    var name =this.props.product.name;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
        <td><button onClick={this.handleSelect}>Select</button></td>
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
    },  
    componentDidMount:function() {
        console.clear();
    },
    handleClick:function(e){
      //this.setState({TestPath:'test'});
      //this.state.TestPath='test';
      //console.log(this.state.TestPath);
    },
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.map(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ProductRow ref='Child_Row' onSelectRow={this.props.onSelectRow}  product={product} key={product.name} />);
    }.bind(this));
    return (
      <div>
      <table border='1' width='300'>
        <thead>
          <tr><th>Name</th><th>Price</th><th>actions</th></tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <p></p><p><button onClick={this.handleClick}>Click</button></p>
      </div>
    );
  }
});



var NewAddBar = React.createClass({
  getInitialState:function(){
    return{productInfo:{name:'',price:''},updateStatus:0};
  },
  handleClick:function(e){
    console.log('click -- addnew');
    this.state.productInfo={name:this.refs.piName.value,price:this.refs.piPrice.value};
        this.setState({updateStatus:1});
    this.props.onUserInput(this.state.productInfo,1);
    //console.log(this.state.productInfo);
    this.refs.piName.value=null;
    this.refs.piPrice.value=null;
  },
  handleUpdate:function(e){
    this.refs.piName.value=e.name;
    this.refs.piPrice.value=e.price;
  },
  componentWillMount:function(){
    console.log('componentWillMount -- addnew');
  },
  componentDidMount:function(){
    console.log("componentDidMount -- addnew");
    this.refs.piName.value=null;
    this.refs.piPrice.value=null;
  },
  render:function(){
    return(
    <table aria-border="1">
      <tr><td colspan='2'>Add New Product</td></tr>
      <tr>
        <td>Name</td>
        <td><input type='text' ref='piName'/></td>
      </tr>
      <tr>
        <td>price</td>
        <td><input type='text' ref='piPrice' /></td>
      </tr>
      <tr><td></td><td><button onClick={this.handleClick}>AddNew</button></td></tr>
    </table>
    );
  }
});


var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      products:[
        {price: '299.99', name: 'iPod Touch'},
        {price: '399.99', name: 'iPhone 5'},
        {price: '199.99', name: 'Nexus 7'}
      ]
    };
  },

  handleUserInput: function(filterText) {
    this.setState({filterText: filterText});
  },
  handleAddNew:function(productInfo,updateStatus){
    this.state.products.push(productInfo);
    this.setState({products:this.state.products});
    console.log(updateStatus);
  },
  handleSelectRow:function(productInfo){
    console.log("selectRow -- FilterableProductTable");
    console.log(productInfo);
    this.refs.Child_AddNewBar.handleUpdate(productInfo);
  },
  componentWillMount:function(){},
  componentDidMount:function(){},  
  render: function(){
    //console.log("render");
    return (
      <div>
          <SearchBar ref='Child_SearchBar' onUserInput={this.handleUserInput} filterText={this.state.filterText}/>      
          <NewAddBar ref='Child_AddNewBar' onUserInput={this.handleAddNew} />
          <ProductTable ref='Child_Table'
            onSelectRow={this.handleSelectRow} 
            products={this.state.products} filterText={this.state.filterText}/>        
      </div>
    );
  }
});
ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('container')
);
