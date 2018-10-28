'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteFull = function NoteFull(props) {

  return React.createElement(
    "div",
    { className: "note-editor" },
    React.createElement("input", { type: "text",
      placeholder: "note title",
      className: "note-editable note-title",
      value: props.title,
      onChange: function onChange(e) {
        return props.changeNote(e.target.value, props.body);
      }
    }),
    React.createElement(
      "button",
      { onClick: props.save, className: "note-save" },
      "Save"
    ),
    React.createElement("br", null),
    React.createElement("textarea", { placeholder: "note body",
      className: "note-editable note-body",
      value: props.body,
      onChange: function onChange(e) {
        return props.changeNote(props.title, e.target.value);
      }
    })
  );
};

var NoteList = function NoteList(props) {

  var noteClassName = function noteClassName(index) {
    if (props.selectedNoteIndex === index) {
      return 'note selected';
    } else {
      return 'note';
    }
  };

  return React.createElement(
    "div",
    { className: "note-list" },
    React.createElement(
      "ul",
      { className: "list-group" },
      props.notes.map(function (noteObj, i) {
        return React.createElement(
          "li",
          { key: i,
            className: noteClassName(i),
            onClick: function onClick() {
              return props.selectNote(i);
            }
          },
          React.createElement(
            "h5",
            { className: "card-title" },
            noteObj.title
          ),
          React.createElement(
            "p",
            { className: "card-text" },
            noteObj.body
          )
        );
      })
    )
  );
};

var TitleBar = function TitleBar(props) {
  return React.createElement(
    "div",
    { className: "title-bar" },
    React.createElement(
      "div",
      { className: "button-box" },
      React.createElement(
        "button",
        { className: "top-button", onClick: props.addNote },
        "Add Note"
      ),
      React.createElement(
        "button",
        { className: "top-button", onClick: props.delNote },
        "Delete Note"
      )
    ),
    React.createElement(
      "span",
      { className: "title" },
      "Super Note Master"
    )
  );
};

var NoteComponent = function (_React$Component) {
  _inherits(NoteComponent, _React$Component);

  function NoteComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NoteComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NoteComponent.__proto__ || Object.getPrototypeOf(NoteComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      notes: [],
      selectedNoteIndex: -1,
      editableTitle: '',
      editableBody: ''
    }, _this.setNotes = function (noteList) {
      if (Array.isArray(noteList) && noteList.length > 0) {
        var selectedNoteIndex = noteList.length - 1;
        _this.setState({
          notes: noteList,
          selectedNoteIndex: selectedNoteIndex,
          editableTitle: noteList[selectedNoteIndex].title,
          editableBody: noteList[selectedNoteIndex].body
        });
      } else {
        _this.setState({
          notes: [],
          selectedNoteIndex: -1,
          editableTitle: 'Add a note with the top left button!',
          editableBody: ''
        });
      }
    }, _this.setNote = function (notes, index, data) {
      notes[index] = data;
      return notes;
    }, _this.addNote = function () {
      fetch('/api/notes', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: { title: '', body: '' } })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.setNotes(data);
      });
    }, _this.delNote = function () {
      var id = _this.state.selectedNoteIndex + 1;
      fetch("/api/notes/" + id, {
        method: 'DELETE'
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.setNotes(data);
      });
    }, _this.selectNote = function (index) {
      var id = index + 1;
      fetch("/api/notes/" + id).then(function (response) {
        return response.json();
      }).then(function (data) {
        if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === 'object' && data.hasOwnProperty('title') && data.hasOwnProperty('body')) {
          _this.setState(function (prevState) {
            return {
              selectedNoteIndex: index,
              notes: _this.setNote(prevState.notes, index, data),
              editableTitle: data.title,
              editableBody: data.body
            };
          });
        } else {
          console.log('request error');
        }
      });
    }, _this.changeNote = function (title, body) {
      _this.setState({
        editableTitle: title,
        editableBody: body
      });
    }, _this.saveNoteChanges = function () {
      var id = _this.state.selectedNoteIndex + 1; // Sql starts at index 1
      var updatedNote = { title: _this.state.editableTitle, body: _this.state.editableBody };
      fetch("/api/notes/" + id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: updatedNote })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.getNote(_this.state.selectedNoteIndex, data);
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NoteComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/api/notes').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setNotes(data);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          notes = _state.notes,
          selectedNoteIndex = _state.selectedNoteIndex;


      return React.createElement(
        "div",
        { className: "App" },
        React.createElement(
          "div",
          { className: "note-top" },
          React.createElement(TitleBar, { addNote: this.addNote,
            delNote: this.delNote
          })
        ),
        React.createElement(
          "div",
          { className: "note-side" },
          React.createElement(NoteList, { notes: notes,
            selectedNoteIndex: selectedNoteIndex,
            selectNote: function selectNote(i) {
              return _this3.selectNote(i);
            }
          })
        ),
        React.createElement(
          "div",
          { className: "note-main" },
          React.createElement(NoteFull, { title: this.state.editableTitle,
            body: this.state.editableBody,
            changeNote: function changeNote(title, body) {
              return _this3.changeNote(title, body);
            },
            save: function save(e) {
              return _this3.saveNoteChanges();
            }
          })
        )
      );
    }
  }]);

  return NoteComponent;
}(React.Component);

var domContainer = document.querySelector('#note_component_container');
ReactDOM.render(React.createElement(NoteComponent, null), domContainer);