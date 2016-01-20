

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
                    <DropdownButton eventKey={3} title="Dropdown">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                    <Link to={'about'}>About</Link>
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

var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var browserHistory  = window.ReactRouter.browserHistory;

// Using this below will start using page links and not hash tags.
// <Router history={browserHistory} >
ReactDOM.render(
  <Router >
    <Route path="/" component={Main}>
      <Route path="about" component={About}/>
      <Route path="users" component={CommentBox}/>
      <Route path="home" component={Home}/>
      <Route path="contact" component={ContactUs}/>
      <Route path="twoway" component={TwoWayBinding}/>
      
      <Route path="*" component={CommentBox}/>
    </Route>
  </Router>
  ,
  document.getElementById('content')
);