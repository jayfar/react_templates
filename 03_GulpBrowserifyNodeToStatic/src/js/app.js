
var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');

var ReactRouter = require('react-router');
var hashHistory = ReactRouter.hashHistory; //require('react-router').hashHistory;//require('react-router/lib/hashHistory.js');
 
var ReactRouterBootstrap = require('react-router-bootstrap');

var TwoWayBinding = require('./TwoWayBinding.js');

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var NavDropdown = ReactBootstrap.NavDropdown;

var Link = ReactRouter.Link;

var LinkContainer = ReactRouterBootstrap.LinkContainer;

var ButtonGroup = ReactBootstrap.ButtonGroup;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var Button = ReactBootstrap.Button;

var GridDemo1 = require('./DataGridDemos.js').DataGridDemo1;
var GridDemo2 = require('./DataGridDemos.js').DataGridDemo2;

var Navigation = React.createClass({

    render: function() {
        return (
            <Navbar className="navbar navbar-inverse navbar-fixed-top">
                <a className="navbar-brand" href="#">{this.props.projectName}</a>
                <Nav className="nav navbar-nav">
                	<LinkContainer to={{ pathname: '/home'}}>
                    	<NavItem className="active" eventKey={1}>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/about'}}>
                    	<NavItem eventKey={2}>About</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/contact'}}>
                    	<NavItem eventKey={2}>Contact</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/twoway'}}>
                    	<NavItem eventKey={2}>Two Way Binding</NavItem>
                    </LinkContainer>
                    <NavDropdown eventKey={3} title="Data Grid" id="basic-nav-dropdown">
                        <LinkContainer to={{ pathname: '/griddemo1'}}>
                          <MenuItem eventKey={3.1}>Demo 1</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{ pathname: '/griddemo2'}}>
                          <MenuItem eventKey={3.2}>Demo 2</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                     </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
});







// https://react-bootstrap.github.io/introduction.html
var ButtonGroupInstance =  React.createClass({
	render: function() {
  		return (
  <ButtonGroup>
    <DropdownButton bsStyle="success" title="Dropdownx">
      <MenuItem key="1">Dropdown link</MenuItem>
      <MenuItem key="2">Dropdown link</MenuItem>
    </DropdownButton>
    <Button bsStyle="info">Middle</Button>
    <Button bsStyle="info">Right</Button>
  </ButtonGroup>
    )
  }
});


var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
       <h1>Users Page</h1>
        <ButtonGroupInstance/>

      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <br/><br/><br/><br/><h1>About</h1>
        <LinkContainer to={{ pathname: '/users', query: { bar: 'baz' } }}>
  			<Button>Foo</Button>
		</LinkContainer>
      </div>
    );
  }
});

var Home = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <br/><br/><br/><br/><h1>Home</h1>
        <LinkContainer to={{ pathname: '/users', query: { bar: 'baz' } }}>
  			<Button>Leave Home</Button>
		</LinkContainer>
      </div>
    );
  }
});

var ContactUs = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <br/><br/><br/><br/><h1>Contact US</h1>
        <LinkContainer to={{ pathname: '/users', query: { bar: 'baz' } }}>
  			<Button>Leave Contact Us</Button>
		</LinkContainer>
      </div>
    );
  }
});



var divStyle = {
  
  paddingTop: "50px",
};


var Main = React.createClass({
  render: function() {
    return (
    <div>
		<Navigation projectName="react-bootstrap-starter" />
        <div className="container" style={divStyle}>
             {this.props.children}
        </div>
    </div>
    );
  }
});

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory  = ReactRouter.browserHistory;

// Using this below will start using page links and not hash tags.
// <Router history={browserHistory} >
ReactDOM.render(
  <Router >
    <Route path="/" component={Main} history={hashHistory}>
      <Route path="about" component={About}/>
      <Route path="users" component={CommentBox}/>
      <Route path="home" component={Home}/>
      <Route path="contact" component={ContactUs}/>
      <Route path="twoway" component={TwoWayBinding}/>
      <Route path="griddemo1" component={GridDemo1}/>
      <Route path="griddemo2" component={GridDemo2}/>
      <Route path="*" component={CommentBox}/>
    </Route>
  </Router>
  ,
  document.getElementById('content')
);