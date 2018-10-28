'use strict';

const NoteFull = (props) => {

  return (
      <div className="note-editor">
        <input type="text"
               placeholder="note title"
               className="note-editable note-title"
               value={props.title}
               onChange={(e) => props.changeNote(e.target.value, props.body)}
        >
        </input>
        <button onClick={props.save} className="note-save">Save</button>
        <br />
        <textarea placeholder="note body"
                  className="note-editable note-body"
                  value={props.body}
                  onChange={(e) => props.changeNote(props.title, e.target.value)}
        >

        </textarea>
      </div>
  );
};


const NoteList = (props) => {

  const noteClassName = (index) => {
    if (props.selectedNoteIndex === index) {
      return 'note selected';
    } else {
      return 'note'
    }
  };

  return (
      <div className="note-list">
        <ul className="list-group">
          {props.notes.map((noteObj, i) =>
              <li key={i}
                   className={noteClassName(i)}
                   onClick={() => props.selectNote(i)}
              >

                <h5 className="card-title">{noteObj.title}</h5>
                <p className="card-text">{noteObj.body}</p>
              </li>
          )}
        </ul>
      </div>
  );
};


const TitleBar = (props) => {
  return (
      <div className="title-bar">
        <div className="button-box">
          <button className="top-button" onClick={props.addNote}>Add Note</button>
          <button className="top-button" onClick={props.delNote}>Delete Note</button>
        </div>
        <span className="title">Super Note Master</span>
      </div>
  );
};


class NoteComponent extends React.Component {

  state = {
    notes: [],
    selectedNoteIndex: -1,
    editableTitle: '',
    editableBody: ''
  };

  componentDidMount() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
          this.setNotes(data);
        });
  }

  setNotes = (noteList) => {
    if (Array.isArray(noteList) && noteList.length > 0) {
      const selectedNoteIndex = noteList.length -1;
      this.setState({
        notes: noteList,
        selectedNoteIndex,
        editableTitle: noteList[selectedNoteIndex].title,
        editableBody: noteList[selectedNoteIndex].body
      });
    } else {
      this.setState({
        notes: [],
        selectedNoteIndex: -1,
        editableTitle: 'Add a note with the top left button!',
        editableBody: ''
      });
    }
  };

  setNote = (notes, index, data) => {
    notes[index] = data;
    return notes;
  };


  addNote = () => {
    fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note: {title: '', body: ''}})
    })
        .then(response => response.json())
        .then(data => {
          this.setNotes(data);
        });
  };

  delNote = () => {
    const id = this.state.selectedNoteIndex+1;
    fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
          this.setNotes(data);
        });
  };

  selectNote = (index) => {
    const id = index+1;
    fetch(`/api/notes/${id}`)
        .then(response => response.json())
        .then(data => {
          if (typeof data === 'object' && data.hasOwnProperty('title') && data.hasOwnProperty('body')) {
            this.setState(prevState => ({
              selectedNoteIndex: index,
              notes: this.setNote(prevState.notes, index, data),
              editableTitle: data.title,
              editableBody: data.body
            }));
          } else {
            console.log('request error');
          }
        });
  };

  changeNote = (title, body) => {
    this.setState({
      editableTitle: title,
      editableBody: body
    });
  };

  saveNoteChanges = () => {
    const id = this.state.selectedNoteIndex+1; // Sql starts at index 1
    const updatedNote = {title: this.state.editableTitle, body: this.state.editableBody};
    fetch(`/api/notes/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note: updatedNote})
    })
        .then(response => response.json())
        .then(data => {
          this.getNote(this.state.selectedNoteIndex, data);
        });
  };

  render() {
    const {notes, selectedNoteIndex} = this.state;

    return (
      <div className="App">
        <div className="note-top">
          <TitleBar addNote={this.addNote}
                    delNote={this.delNote}
          />
        </div>
        <div className="note-side">
          <NoteList notes={notes}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={(i) => this.selectNote(i)}
          />
        </div>
        <div className="note-main">
          <NoteFull title={this.state.editableTitle}
                    body={this.state.editableBody}
                    changeNote={(title, body) => this.changeNote(title, body)}
                    save={(e) => this.saveNoteChanges()}
          />
        </div>
      </div>
    );
  }
}
let domContainer = document.querySelector('#note_component_container');
ReactDOM.render(<NoteComponent />, domContainer);
