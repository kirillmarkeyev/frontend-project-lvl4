import React from 'react';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice.js';

const Channels = (props) => {
  const { showModal } = props;
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const dispatch = useDispatch();

  const channelsRender = () => {
    const handleClick = (id) => {
      dispatch(channelsActions.setCurrentChannelId(id));
    };

    return (
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <button
              type="button"
              onClick={() => handleClick(channel.id)}
              className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
                'btn-secondary': channel.id === currentChannelId,
              })}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const handleAddChannel = () => {
    console.log('Adding new channel');
    showModal('adding');
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button onClick={handleAddChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      {channelsRender()}
    </div>
  );
};

export default Channels;
