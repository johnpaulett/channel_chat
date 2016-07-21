import { connect } from 'react-redux';
import { selectRoom } from '../actions';
import RoomList from '../components/RoomList.react';


const mapStateToProps = (state) => ({
  currentRoomId: state.currentRoomId,
  rooms: state.rooms,
});

const mapDispatchToProps = (dispatch) => ({
  onRoomClick: (room) => {
    dispatch(selectRoom(room));
  },
});

const ActiveRoomList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);

export default ActiveRoomList;
