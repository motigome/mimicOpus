import React from 'react';
import PropTypes from 'prop-types';


class NoteBlock extends React.Component { // ノーツ
  /*
    start: ノートオン時刻
    end: ノートオフ時刻
    pitch: ノートナンバー
    parent: 親 PianoRollGrid インスタンス．
  */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { delNote } = this.props;
    // クリックイベントの親オブジェクトへの伝播を止める
    event.stopPropagation();
    delNote();
  }

  render() {
    const {
      start, end, uw, uh,
    } = this.props;
    const divStyle = {
      width: uw * (end - start),
      height: uh,
      backgroundColor: 'blue',
      borderRadius: 10,
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0.5,
    };
    return (
      <div
        style={divStyle}
        onMouseDown={this.handleClick}
        role="button"
        tabIndex="0"
      />
    );
  }
}

NoteBlock.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  uw: PropTypes.number.isRequired,
  uh: PropTypes.number.isRequired,
  delNote: PropTypes.func.isRequired,
};

export default NoteBlock;