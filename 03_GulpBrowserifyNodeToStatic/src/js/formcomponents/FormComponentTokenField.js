var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');

var TokenField = require('../TokenField.js').TokenField;

var exports = module.exports = {};

// Note: I had to modify the tcomb-form.js code to make it lower case 'react' because I got this error if I had lower and also upper was used????
// http://stackoverflow.com/a/32000556
var t = require('./tcomb-form.js');

// Working on custom form items. See:
// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md#custom-factories
// https://github.com/gcanti/tcomb-form/issues/273
// https://github.com/gcanti/tcomb-form/issues/261

function renderTextbox(locals) {
  const onChange = (evt) => locals.onChange(evt.target.value)
  return (
    <div>
      <div className="input-group">
        <input className="form-control" type="text" value={locals.value} onChange={onChange} />
      </div>
    </div>
  )
}

// override just the renderTextbox partial of the default template
const tagTemplate = t.form.Form.templates.textbox.clone({ renderTextbox })

class TagsComponent extends t.form.Component { // extend the base class

  getTemplate() {
    return tagTemplate;
  }

}

exports.TagsComponent = TagsComponent;


