var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

// https://facebook.github.io/react/docs/two-way-binding-helpers.html
var NoLink = React.createClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({message: event.target.value});
  },
  render: function() {
    var message = this.state.message;
    return (
        <div>
            <input type="text" value={message} onChange={this.handleChange} />
        </div>
    );
  }
});



// http://voidcanvas.com/react-tutorial-two-way-data-binding/

// In this case what we are doing is, once the value of the textbox in ‘InputBox1’ component is changed, we are calling a function of that component, named ‘update’. 
// There we are storing the current value of the textbox in a variable named ‘modifiedValue’ and passing it as a parameter and calling the function updateValue() of 
// the parent component ‘DisplayContainer1’, which was passed through ‘prop’.

// The ‘updateValue()’ function of ‘DisplayContainer1’ change the state variable ‘value’ and once it is changed, the modified value will be reflected everywhere as, 
// ‘DisplayContainer1’ is the owner of the state ‘value’.

var DisplayContainer1 = React.createClass({
    updateValue:function(modifiedValue){
        this.setState({
            value:modifiedValue
        })
    },
    getInitialState:function(){
        return{
            value:'My Value'
        }
    },
    render:function(){
        return (
            <div className="DisplayContainer">
                <h3>{this.state.value}</h3>
                <InputBox1 value={this.state.value} updateValue={this.updateValue}/>
            </div>
        );
    }
});
 
var InputBox1 = React.createClass({
    update:function(){
        var modifiedValue=this.refs.inputValue.getDOMNode().value;
        this.props.updateValue(modifiedValue);
    },
    render:function(){
        return (<input type="text" ref="inputValue" value={this.props.value} onChange={this.update} />)
    }
});
 



// Using ReactLinkMixin things are very easy. To use ReactLink you must include the react library react-with-addons.js to your html page. Once you include you are 
// ready to use ReactLink.

// In this case, instead of sending a state variable as a property, you send a ReactLink. If you are using ReactLinkMixin, you can get a ReactLink of a state variable 
// by using this.linkState(‘stateVarName’). This returns a ReactLink variable which has two properties inside it; ‘value’ and ‘requestChange()’. ‘value’ returns the value 
// of the ReactLink and ‘requestChange()’ is fired automatically once your variable is changed. So by using ReactLink you don’t have to manually update anything in your 
// parent or owner; it does all this from back automatically.


var DisplayContainer2 = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState:function(){
        return{
            value:'My Value'
        }
    },
    render:function(){
        return (
            <div className="DisplayContainer">
                <h4>{this.state.value}</h4>
                <InputBox2 valueLink={this.linkState('value')} />
            </div>
        );
    }
});
 
var InputBox2 = React.createClass({
    render:function(){
        return (<input type="text" valueLink={this.props.valueLink} />)
    }
});



// Well, what reactLink does in back, we also can follow that approach without using the ReactLink mixing.

// We just have to create an object and name it whatever you want (as here I’ve given customValueLink). Inside that object make two variables, ‘value’ and ‘requestChange’ 
// and assign them the state variable and a function which will update your state variable respectively. And that’s it; you now can use your custom ReactLink variable 
// just like the original one. It will work just like ReactLinkMixin.

var DisplayContainer3 = React.createClass({
    update:function(modifiedValue){
        this.setState({value: modifiedValue});
    },
    getInitialState:function(){
        return{
            value:'My Value'
        }
    },
    render:function(){
        var customValueLink={
            value: this.state.value,
            requestChange: this.update
        };
        return (
            <div className="DisplayContainer">
                <h4>{this.state.value}</h4>
                <InputBox3 customValueLink={customValueLink} />
            </div>
        );
    }
});
 
var InputBox3 = React.createClass({
    render:function(){
        return (<input type="text" valueLink={this.props.customValueLink} />)
    }
});



// http://stackoverflow.com/questions/33109430/script-tag-text-babel-variable-scope
window.TwoWayBinding = React.createClass({
  render: function() {
    return (
         <div>
    <NoLink />
    <h1>Method 1: Manually notifying the parent</h1>
    <DisplayContainer1 />
    <h1>Method 2: Using ReactLink Mixin</h1>
    <DisplayContainer2 />
    <h1>Method 3: Manual ReactLink approach</h1>
    <DisplayContainer3 />
    </div>
    );
  }
});


module.exports = TwoWayBinding
