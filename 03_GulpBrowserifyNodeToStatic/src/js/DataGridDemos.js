var $ = require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var ReactDataGrid = require('react-data-grid');

var exports = module.exports = {};




//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

var _rows = [];
//helper to create a fixed number of rows
function createRows(numberOfRows){
  
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: randomDate(new Date(2015, 3, 1), new Date()),
      completeDate: randomDate(new Date(), new Date(2016, 0, 1))
    });
  }
  return _rows;
}

//Custom Formatter component
var PercentCompleteFormatter = React.createClass({
  render:function(){
    var percentComplete = this.props.value + '%';
    return (
      <div className="progress" style={{marginTop:'20px'}}>
        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:percentComplete}}>
        {percentComplete}
      </div>
      </div>);
    }
});

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80
},
{
  key: 'task',
  name: 'Title',
  editable : true
},
{
  key: 'priority',
  name: 'Priority',
  editable : true
},
{
  key: 'issueType',
  name: 'Issue Type',
  editable : true
},
{
  key: 'complete',
  name: '% Complete',
  formatter : PercentCompleteFormatter
  //editable : true
},
{
  key: 'startDate',
  name: 'Start Date',
  editable : true
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  editable : true
}
]




exports.DataGridDemo1 = React.createClass({
  getInitialState : function(){
    return {rows : createRows(1000)}
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx]
  },
  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  },
  
  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.rowGetter}
      rowsCount={this.state.rows.length}
      minHeight={500}
      onRowUpdated={this.handleRowUpdated} />
    )
  }
});


////// Custom row renderer example:


var RowRenderer = React.createClass({
  setScrollLeft: function(scrollBy) {
    //if you want freeze columns to work, you need to make sure you implement this as apass through
    this.refs.row.setScrollLeft(scrollBy);
  },
 getRowStyle: function() {
   return {
     color: this.getRowBackground()
   }
 },
 getRowBackground: function() {
   return this.props.idx % 2 ?  'green' : 'blue'
 },
 render: function() {
   //here we are just changing the style
   //but we could replace this with anything we liked, cards, images, etc
   //usually though it will just be a matter of wrapping a div, and then calling back through to the grid
   return (<div style={this.getRowStyle()}><ReactDataGrid.Row ref="row" {...this.props}/></div>)
 }
});


exports.DataGridDemo2 = React.createClass({
  render: function() {
    var rows = createRows(100);
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    minHeight={500}
    rowRenderer={RowRenderer}/>);
  }
});
