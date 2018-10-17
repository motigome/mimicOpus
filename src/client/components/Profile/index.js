import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempUsername: props.username,
    };
  }

  render() {
    const { photoURL, changeUsername, bInvalidUsername } = this.props;
    const { tempUsername } = this.state;
    const avatarStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 200,
      height: 200,
    };
    return (
      <div>
        {(photoURL !== null && photoURL !== undefined && photoURL !== '')
          ? (
            <Avatar
              alt="no image"
              src={photoURL}
              style={avatarStyle}
            />
          ) : (
            <Avatar
              style={avatarStyle}
            >
              <AccountCircleIcon />
            </Avatar>
          )
        }
        <Input
          value={tempUsername}
          inputProps={{
            'aria-label': 'Description',
          }}
          style={{
            position: 'absolute', top: 210, left: 10, height: 40, width: 180,
          }}
          onChange={e => this.setState({ tempUsername: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            position: 'absolute', top: 10, left: 810, height: 40, width: 120,
          }}
          onClick={() => {
            changeUsername(tempUsername);
          }}
        >
          変更
        </Button>
        {(bInvalidUsername) ? (
          <Typography
            color="error"
            style={{
              position: 'absolute', top: 0, left: 300, width: 180,
            }}
          >
            ユーザーネームが重複しています
          </Typography>
        ) : null}
      </div>
    );
  }
}

Profile.propTypes = {
  photoURL: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bInvalidUsername: PropTypes.bool.isRequired,
  changeUsername: PropTypes.func.isRequired,
};

export default Profile;
