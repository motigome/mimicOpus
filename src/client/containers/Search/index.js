import { connect } from 'react-redux';

import {
  setQuestion,
  changeDisplayMode,
  setBPM,
  setNotes,
  setTitle,
  setLowBPM,
  setHighBPM,
  loadQuestionsList,
  setQuestionId,
  deleteUploadedQuestion,
  setSearchTitle,
  setSearchUser,
  loadCountQuestions,
} from '../../actions';
import Search from '../../components/Search';

const mapStateToProps = state => ({
  questionsList: state.music.questionsList,
  uid: state.auth.uid,
  lowBPM: state.search.lowBPM,
  highBPM: state.search.highBPM,
  searchTitle: state.search.searchTitle,
  searchUser: state.search.searchUser,
  countQuestions: state.search.countQuestions,
});

const mapDispatchToProps = dispatch => ({
  setQuestion: question => dispatch(setQuestion(question)),
  changeDisplayMode: mode => dispatch(changeDisplayMode(mode)),
  setBPM: bpm => dispatch(setBPM(bpm)),
  setNotes: notes => dispatch(setNotes(notes)),
  setTitle: title => dispatch(setTitle(title)),
  setLowBPM: bpm => dispatch(setLowBPM(bpm)),
  setHighBPM: bpm => dispatch(setHighBPM(bpm)),
  loadQuestionsList: (
    lowBPM, highBPM, start, stop, title, user, madeByMe, answered, unanswered
  ) => loadQuestionsList(
    dispatch, lowBPM, highBPM, start, stop, title, user, madeByMe, answered, unanswered,
  ),
  setSearchTitle: searchTitle => dispatch(setSearchTitle(searchTitle)),
  setSearchUser: searchUser => dispatch(setSearchUser(searchUser)),
  setQuestionId: questionId => dispatch(setQuestionId(questionId)),
  deleteUploadedQuestion,
  loadCountQuestions: (
    lowBPM, highBPM, title, user, madeByMe, answered, unanswered
  ) => loadCountQuestions(
    dispatch, lowBPM, highBPM, title, user, madeByMe, answered, unanswered,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
