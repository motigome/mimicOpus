import { connect } from 'react-redux';

import {
  addNote, delNote, shiftPitchRange, setBPM, uploadQuestion, setTitle,
} from '../../actions';
import MakeQuestion from '../../components/MakeQuestion';

const mapStateToProps = state => ({
  notes: state.music.notes,
  pitchRange: state.music.pitchRange,
  bpm: state.music.bpm,
  title: state.music.title,
});

const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(addNote(note)),
  delNote: idx => dispatch(delNote(idx)),
  shiftPitchRange: delta => dispatch(shiftPitchRange(delta)),
  setBPM: bpm => dispatch(setBPM(bpm)),
  setTitle: title => dispatch(setTitle(title)),
  uploadQuestion,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakeQuestion);