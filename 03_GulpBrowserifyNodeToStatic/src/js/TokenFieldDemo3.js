var $ = require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');

var ReactBootstrap = require('react-bootstrap');

var TokenField = require('./TokenField.js').TokenField;

var exports = module.exports = {};


exports.TokenFieldDemo3 = React.createClass({
   
    getInitialState: function()
    {
        return {
            selected: ["Ruby"]
        };
    },
    componentWillMount: function()
    {
        this.options = [
          "Ruby",
          "C#",
          "JavaScript",
          "Java",
          "C++",
          "Assembly",
          "Lisp",
          "Apple Script",
          "Basic"
        ];
    },
    selectedTokensChanged: function(newArray)
    {
        console.log("Change Callback:");
        console.log(newArray);
        this.setState(
        {
            selected: newArray
        })
    },
    render: function()
    {
        
        var selectedNames = this.state.selected.map(function(item)
        {
            return <li key={item}>{item}</li>
        })

        return (
            <div>
            <h1>React TokenInput Wrapped in Control Example</h1>

            <TokenField
              options={this.options}
              allowAnyEntry={false}
              dropdownOnClick={false}
              initialSelections={this.state.selected}
              tagListModifiedHandler={this.selectedTokensChanged}
              />

            <h2>Selected</h2>
            <ul>
              {selectedNames}
            </ul>
          </div>
        );
    }
});








