import { connect } from 'react-redux';
import { selectRoom } from '../actions';
import RoomList from '../components/RoomList.react';


const mapStateToProps = (state) => {
  return {
    currentRoom: state.currentRoom,
    rooms: state.rooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRoomClick: (id) => {
      console.log(id)
      dispatch(selectRoom(id));
    },
  };
};

const ActiveRoomList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);

export default ActiveRoomList;
