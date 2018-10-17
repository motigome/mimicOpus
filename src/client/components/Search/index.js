import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import displayModes from '../../data/displayModes';

// サンプラー
const sampler = new Tone.Sampler({
  C2: 'C2.wav',
  E2: 'E2.wav',
  Ab2: 'Ab2.wav',
  C3: 'C3.wav',
  E3: 'E3.wav',
  Ab3: 'Ab3.wav',
  C4: 'C4.wav',
  E4: 'E4.wav',
  Ab4: 'Ab4.wav',
  C5: 'C5.wav',
  E5: 'E5.wav',
  Ab5: 'Ab5.wav',
  C6: 'C6.wav',
}, {
  release: 1,
  onload: () => {
    // sampler will repitch the closest sample
    sampler.toMaster();
    // console.log('sampler successfully loaded!');
  },
  baseUrl: './instrument_piano/',
});
Tone.Transport.start();


function noteNumberToPitchName(nn) {
  return ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'][nn % 12] + (Math.floor(nn / 12) - 1);
}

class Search extends React.Component {
  static play(notes, bpm = 120) { // 一連の音符たちを鳴らしたい場合，Tone.Part が便利．（他に Tone.Sequence というのもあるようだ）
    // bpm 例外処理・・・
    const secPerBeat = 60 / bpm;
    const timeEventTupleList = [];
    for (let i = 0; i < notes.size; i += 1) {
      const note = notes.get(i);
      timeEventTupleList.push(
        [note.start * secPerBeat, [note.pitch, (note.end - note.start) * secPerBeat]],
      );
    }
    const melody = new Tone.Part(
      (time, event) => {
        sampler.triggerAttackRelease(
          noteNumberToPitchName(event[0]), event[1], time, 1,
        ); // 引数は，おそらく (音高，音長，絶対時刻[s]，ベロシティ[0~1])
      }, timeEventTupleList,
    );
    melody.start(Tone.now()); // 先に Tone.Transport.start() してある必要がある．
  }

  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  componentDidMount() {
    const { lowBPM, highBPM, loadQuestionsList } = this.props;
    const { page } = this.state;
    loadQuestionsList(lowBPM, highBPM, 10 * page + 1, 10 * (page + 1));
  }

  render() {
    const {
      questionsList, lowBPM, highBPM, setQuestion, changeDisplayMode, setBPM, setLowBPM, setHighBPM,
      loadQuestionsList, setQuestionId, setNotes, setTitle, deleteUploadedQuestion, uid,
      searchTitle, setSearchTitle, searchUser, setSearchUser,
    } = this.props;
    const { page } = this.state;
    return (
      <div id="Search">
        <Paper
          style={{
            position: 'absolute', top: 0, left: 0, width: 1000, height: 100,
          }}
        >
          <div
            id="search title input"
            style={{
              position: 'absolute', top: 20, left: 10,
            }}
          >
            <Typography
              style={{
                position: 'absolute', top: 0, left: 0, width: 180,
              }}
            >
              Title
            </Typography>
            <Input
              value={searchTitle}
              inputProps={{
                'aria-label': 'Description',
              }}
              style={{
                position: 'absolute', top: 10, left: 0, height: 40, width: 180,
              }}
              onChange={e => setSearchTitle(e.target.value)}
            />
          </div>
          <div
            id="bpm picker"
            style={{
              position: 'absolute', top: 20, left: 250,
            }}
          >
            <Typography
              style={{
                position: 'absolute', top: 0, left: 0, width: 180,
              }}
            >
              BPM
            </Typography>
            <FormControl
              style={{
                position: 'absolute', top: 20, left: 0, width: 100,
              }}
            >
              <Select
                value={lowBPM}
                onChange={(e) => {
                  setLowBPM(e.target.value);
                }}
                displayEmpty
              >
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={80}>80</MenuItem>
              </Select>
            </FormControl>
            <Typography
              style={{
                position: 'absolute', top: 30, left: 110, width: 20,
              }}
            >
              ~
            </Typography>
            <FormControl
              style={{
                position: 'absolute', top: 20, left: 130, width: 100,
              }}
            >
              <Select
                value={highBPM}
                onChange={(e) => {
                  setHighBPM(e.target.value);
                }}
                displayEmpty
              >
                <MenuItem value={180}>180</MenuItem>
                <MenuItem value={190}>190</MenuItem>
                <MenuItem value={200}>200</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            id="search title user"
            style={{
              position: 'absolute', top: 20, left: 520,
            }}
          >
            <Typography
              style={{
                position: 'absolute', top: 0, left: 0, width: 180,
              }}
            >
              User
            </Typography>
            <Input
              value={searchUser}
              inputProps={{
                'aria-label': 'Description',
              }}
              style={{
                position: 'absolute', top: 10, left: 0, height: 40, width: 180,
              }}
              onChange={e => setSearchUser(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{
              position: 'absolute', top: 50, left: 810, height: 40, width: 120,
            }}
            onClick={() => {
              loadQuestionsList(lowBPM, highBPM, 10 * page + 1, 10 * (page + 1));
            }}
          >
            Search
          </Button>
        </Paper>
        <Table
          style={{
            position: 'absolute',
            top: 110,
            left: 0,
            width: 1000,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Questions</TableCell>
              <TableCell>BPM</TableCell>
              <TableCell>User</TableCell>
              <TableCell>uploadedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {// TODO do not use array index
              [...questionsList].map((item) => {
                const { id, question } = item;
                const date = `${question.uploadedAt.getFullYear()}/${question.uploadedAt.getMonth()}/${question.uploadedAt.getDate()}`;
                const bMine = (uid === question.uid);
                return (
                  <TableRow
                    key={id}
                    hover={!bMine}
                    onClick={() => {
                      if (!bMine) {
                        setQuestion(question);
                        setBPM(question.bpm);
                        setQuestionId(id);
                        changeDisplayMode(displayModes.PLAY_QUESTION);
                      }
                    }}
                    style={{ cursor: (bMine) ? 'default' : 'pointer' }}
                  >
                    <TableCell>
                      <IconButton
                        aria-label="Play"
                        onClick={(e) => {
                          Search.play(question.notes, question.bpm);
                          e.stopPropagation();
                        }}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                      {(bMine) ? (
                        <IconButton
                          aria-label="Edit"
                          onClick={(e) => {
                            setNotes(question.notes);
                            setBPM(question.bpm);
                            setQuestionId(id);
                            setTitle(question.title);
                            changeDisplayMode(displayModes.EDIT_QUESTION);
                            e.stopPropagation();
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      ) : null
                      }
                      {(bMine) ? (
                        <IconButton
                          aria-label="Delete"
                          onClick={(e) => {
                            deleteUploadedQuestion(id);
                            e.stopPropagation();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : null
                      }
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {question.title}
                    </TableCell>
                    <TableCell>{question.bpm}</TableCell>
                    <TableCell>{question.userName}</TableCell>
                    <TableCell>{date}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
          <TableFooter>
            <IconButton
              aria-label="Back"
              onClick={() => {
                this.setState({ page: page - 1 });
                loadQuestionsList(lowBPM, highBPM, 10 * (page - 1) + 1, 10 * page);
              }}
              style={{
                top: 10, left: 800,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              aria-label="Forward"
              onClick={() => {
                this.setState({ page: page + 1 });
                loadQuestionsList(lowBPM, highBPM, 10 * (page + 1) + 1, 10 * (page + 2));
              }}
              style={{
                top: 10, left: 850,
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

Search.propTypes = {
  questionsList: PropTypes.instanceOf(Immutable.List).isRequired,
  uid: PropTypes.number.isRequired,
  lowBPM: PropTypes.number.isRequired,
  highBPM: PropTypes.number.isRequired,
  searchTitle: PropTypes.string.isRequired,
  searchUser: PropTypes.string.isRequired,
  setQuestion: PropTypes.func.isRequired,
  changeDisplayMode: PropTypes.func.isRequired,
  setBPM: PropTypes.func.isRequired,
  setNotes: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setLowBPM: PropTypes.func.isRequired,
  setHighBPM: PropTypes.func.isRequired,
  loadQuestionsList: PropTypes.func.isRequired,
  setQuestionId: PropTypes.func.isRequired,
  deleteUploadedQuestion: PropTypes.func.isRequired,
  setSearchTitle: PropTypes.func.isRequired,
  setSearchUser: PropTypes.func.isRequired,
};

export default Search;
