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
            placeholder: "Enter tokens here",
            enteredCommasSplitIntoTags: false,
            allowAnyEntry: true,
            dropdownOnClick: false,
            tagListModifiedHandler: function(array) {},
        };
    },
    getInitialState: function()
    {
        this.parseInputTagList(this.props.options);
        return {
            input: '',
            loading: false,
            selected: this.mapArrayToObjectList(this.props.initialSelections),
            options: this.optionsAsArrayOfObjs
        };
    },
    componentWillReceiveProps: function(newProps)
    {
        
        var selProps = [];
        if($.isArray(newProps.initialSelections) && newProps.initialSelections.length > 0)
        {
            selProps = newProps.initialSelections;
            if(selProps.length == 1 && selProps[0] === "")
            {
                selProps = [];
            }
        }

        this.setState(
        {
            selected: this.mapArrayToObjectList(selProps),
        })
    },
    componentWillMount: function()
    {
        // Used so we don't show the list if an item was just removed (basically ignore that click).
        this.itemJustRemoved = false;
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
    
    parseInputTagList: function(theProps) {
        if($.isArray(theProps) && theProps.length > 0)
        {
            this.optionsAsArrayOfObjs = this.mapArrayToObjectList(theProps);
        }
        else
        {
             this.optionsAsArrayOfObjs = [];
        }
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
        this.itemJustRemoved = true;
        var selectedOptions = uniq(without(this.state.selected, value))

        this.setState(
        {
            selected: selectedOptions,
            options: []
        })

        if (this.props.tagListModifiedHandler instanceof Function) 
        { 
            this.props.tagListModifiedHandler(this.mapObjectListToArray(selectedOptions));
        }
    },

    // Called each time a selected or entered value is converted to a tag 
    // Either comes in as a string from direct keyboard entry or {id / name object} from list selection
    handleSelect: function(value, combobox)
    {
        if (typeof value === 'string')
        {
            if (this.props.allowAnyEntry == false)
                return;

            var valueArray = [value];
            if(this.props.enteredCommasSplitIntoTags == true)
            {
                valueArray = value.split(',');
            }
            value = valueArray.map(function(v)
            {
                return {
                    id: v,
                    name: v
                };
            });
        }
        else
        {
            value = [value];
        }

        var selected = uniq(this.state.selected.concat(value))
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
        // Ignore this click if user is removing an item.
        if(this.itemJustRemoved == true)
        {
            this.itemJustRemoved = false;
            return; 
        }

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
                placeholder={this.props.placeholder}
              />

          </div>
        );
    }
});
