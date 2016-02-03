var $ = require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');

var TokenInput = require('react-tokeninput')
var ComboboxOption = require('react-tokeninput').Option

var without = require('lodash-node/modern/array/without')
var uniq = require('lodash-node/modern/array/uniq')

var exports = module.exports = {};

exports.TokenField = React.createClass({
   getDefaultProps: function()
    {
        return {
            initialSelections: [],
            options: [],
            allowAnyEntry: true,
            dropdownOnClick: false,
            tagListModifiedHandler: function(array) {},
        };
    },
    getInitialState: function()
    {
        this.parseInputTagList();
        return {
            input: '',
            loading: false,
            selected: this.mapArrayToObjectList(this.props.initialSelections),
            options: this.optionsAsArrayOfObjs
        };
    },
    componentWillReceiveProps: function(newProps)
    {
        this.parseInputTagList();
    },
    componentWillMount: function()
    {

    },
    mapArrayToObjectList: function(array) {
        return array.map(function(name) {
            return {
                id: name,
                name: name
            }
        });
    },
    mapObjectListToArray: function(arrayObjs) {
        return arrayObjs.map(function(obj) {
            return obj.name;
          }
        );
    },
    
    parseInputTagList: function() {
        this.optionsAsArrayOfObjs = this.mapArrayToObjectList(this.props.options);
    },
    
    handleChange: function(value)
    {
        this.setState(
        {
            selected: value
        })

        if (this.props.tagListModifiedHandler instanceof Function) 
        { 
            this.props.tagListModifiedHandler(this.mapObjectListToArray(value));
        }
    },

    handleRemove: function(value)
    {
        var selectedOptions = uniq(without(this.state.selected, value))
        this.handleChange(selectedOptions)
    },

    // Called each time a selected or entered value is converted to a tag 
    // Either comes in as a string from direct keyboard entry or {id / name object} from list selection
    handleSelect: function(value, combobox)
    {
        if (typeof value === 'string')
        {
            value = {
                id: value,
                name: value
            };
            if (this.props.allowAnyEntry == false)
                return;
        }

        var selected = uniq(this.state.selected.concat([value]))
        this.setState(
        {
            selected: selected,
            selectedToken: null
        })

        this.handleChange(selected)
    },

    // Called each time a character is typed
    handleInput: function(userInput)
    {
        this.setState(
        {
            input: userInput,
            loading: true,
            options: []
        })
        var timeout = 1;
        if (this.props.allowAnyEntry) 
        {
            timeout = 500;
        }
        setTimeout(function()
        {
            this.filterTags(this.state.input)
            this.setState(
            {
                loading: false
            })
        }.bind(this), timeout);
    },
    filterTags: function(userInput)
    {
        if (userInput === '')
        {
            return this.setState(
            {
                options: []
            });
        }

        var filter = null;
        if(userInput != null)
        {
          filter = new RegExp('^' + userInput, 'i');
        }
        var filteredNames = this.optionsAsArrayOfObjs.filter(function(state)
        {
            if(userInput == null) return true;
            else return filter.test(state.name); // || filter.test(state.id);
        }).filter(function(state)
        {
            return this.state.selected
                .map(function(value)
                {
                    return value.name
                })
                .indexOf(state.name) === -1
        }.bind(this))


        this.setState(
        {
            options: filteredNames
        });
    },

    renderComboboxOptions: function()
    {
        return this.state.options.map(function(name)
        {
            return (
                <ComboboxOption
              key={name.id}
              value={name}
            >{name.name}</ComboboxOption>
            );
        });
    },
    clicked: function()
    {
        if(this.props.dropdownOnClick == true)
        {
          this.filterTags(null);
        }
    },
    render: function()
    {
        
        var options = this.state.options.length ?
            this.renderComboboxOptions() : [];

        const loadingComponent = (
            <span className="glyphicon glyphicon-hourglass" />
        )

        return (
            <div onClick={this.clicked}>

            <TokenInput
                isLoading={this.state.loading}
                loadingComponent={loadingComponent}
                menuContent={options}
                onChange={this.handleChange}
                onInput={this.handleInput}
                onSelect={this.handleSelect}
                onRemove={this.handleRemove}
                selected={this.state.selected}
                placeholder='Enter tokens here'
              />

          </div>
        );
    }
});
