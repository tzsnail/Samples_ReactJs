var CP_ChildComment = React.createClass({
        getInitialState: function () {
            return {sendCount:0};
        },
        //子组件调用父组件，采用props的方式进行调用和赋值，在父组件中设置相关属性值或者方法，
        //子组件通过props的方式进行属性赋值或者方法调用
        send2Parent: function () {
            console.log("before: "+this.state.sendCount);
            this.state.sendCount += 1;      
            this.setState({sendCount: this.state.sendCount});
            console.log("afeter: "+this.state.sendCount);
             this.props.getTotalCount();
        },
        componentWillMount:function(){
            console.log("componentWillMount ：" + this.state.sendCount);
        },
       render: function () {
           return (
               <p>
                <button onClick={this.send2Parent}>{this.props.buttonName}</button>
                <label>        send num : {this.state.sendCount}</label>
               </p>              
           );
       }
    });

var CP_ParentComponent = React.createClass({
        getInitialState: function () {
            return {sendCount:0,totalCount:0};
        },
        //父组件调用子组件，采用refs的方式进行调用，需要父组件在调用子组件的时候，
        //添加ref属性，并进行唯一命名，在父组件中即可调用
        send2Child: function () {
            this.refs.Child.send2Parent ();
            this.getSwordCount();
        },
        getTotalCount:function()
        {
            this.state.totalCount += 1;
           console.log(this.state.totalCount);
        },
        getSwordCount: function () {
            this.state.totalCount = this.state.sendCount + this.refs.Child.state.sendCount;
            //this.setState({totalCount:this.state.sendCount+this.refs.getSwordButton.state.sendCount});
            
        },
        render: function () {
            return (
                <div>
                    <CP_ChildComment ref="Child" getTotalCount={this.getTotalCount} buttonName="儿子送宝刀"/>
                    <p>
                    <button onClick={this.send2Child}>通过老爸送宝刀</button>
                    <label>        send num : {this.state.sendCount}</label>
                    </p>
                    <p>
                        父子俩共送{this.state.totalCount}把宝刀！！！
                    </p>
                </div>
            );
        }
    });

ReactDOM.render(
  <CP_ParentComponent/>,
  document.getElementById('example')
);
