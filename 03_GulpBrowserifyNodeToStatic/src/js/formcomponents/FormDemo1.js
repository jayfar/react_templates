var $ = require('jQuery');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');

var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

var TokenField = require('../TokenField.js').TokenField;

var TagsComponent = require('./FormComponentTokenField.js').TagsComponent;

// Note: I had to modify the tcomb-form.js code to make it lower case 'react' because I got this error if I had lower and also upper was used????
// http://stackoverflow.com/a/32000556
var t = require('./tcomb-form.js');

var Form = t.form.Form;

const FormSchema = t.struct({
  username: t.String,
  email: t.String, 
  tags: t.String,
  data_skills: t.maybe(t.String)
})

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md#type-attribute
const FormOptions = {
    //auto: 'none',
    fields: {
        email: {label:"Email", type: "text", disabled: false},
        username: {label:"User Name", type: "text", disabled: false},

        tags: {
            label:"Tag Test",
            factory: TagsComponent
        },

        data_skills: {label:"Skills (comma seperated)", type: "textarea"}
        
    }
}


module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      data: {},
      AddHandler: function(newObject) {},
      UpdateHandler: function(modifiedObject) {}
    };
  },
  getInitialState: function()
  {
    return {
       value: this.props.data
     };
  },
  componentWillReceiveProps: function(newProps) 
  {
    // you don't have to do this check first, but some times it helps prevent against an unneeded render.
    //if (newProps.startTime != this.state.startTime) {

    // Without this, the textareas would not clear when doing an "add new" after "edit". It seems the
    // text area does not clear like the other fields if the object attached to the text field is not
    // passed in.
    if(!newProps.data.hasOwnProperty("data_skills"))
    {
      newProps.data.data_skills = "";
    }
    
    var newState = {
        value: newProps.data,
        fullname: newProps.data.fullname
    };

    this.setState(newState);
  },
  componentWillMount: function()
  {
        var d = new Dog("Tango");
        d.speak();
        
        this.initalOptions = ["C#"];

         this.options = [
          "Ruby",
          "C#",
          "JavaScript",
          "Java",
          "C++",
          "Assembly",
          "Lisp",
          "Apple Script",
          "Basic",
          "C"
        ];
  },
  onChange: function(value) 
  {
    //console.log("set a flag so informing the user that data is not saved if another item in the list is selected before a save.");
    // Push the new value just typed into the statw
    this.setState({value: value});
  },
  save: function() {
    var value = this.refs.form.getValue();
    alert(JSON.stringify(value));
  },
  render: function() {
    
    return (
            <div>
            <Form ref="form" type={FormSchema} value={this.state.value} options={FormOptions} onChange={this.onChange} />
          
          <TokenField
              options={this.options}
              allowAnyEntry={false}
              dropdownOnClick={true}
              initialSelections={this.initalOptions}
              placeholder='Click to add a skill'
              
              />

            <Button bsStyle="primary" onClick={this.save}><Glyphicon glyph="save" />Save</Button>
           </div>
        );
    
  }
});

// Testing the babelify build step
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}