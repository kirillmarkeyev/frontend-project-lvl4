import React from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const Messages = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># general</b></p>
          <span className="text-muted">2 сообщения</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          <div className="text-break mb-2">
            <b>admin</b>: Test message
          </div>
          <div className="text-break mb-2">
            <b>admin</b>: One more test message
          </div>
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value=""
              />
              <button type="submit" className="btn btn-group-vertical" disabled="">
                <ArrowRightSquare />
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
