import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useSocket } from '../../hooks/index.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Remove = () => {
  const dispatch = useDispatch();
  const chat = useSocket();
  const { t } = useTranslation();

  const itemId = useSelector((state) => state.modals.itemId);

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    toast.success(t('modalRemove.success'));
    dispatch(modalsActions.hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modalRemove.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalRemove.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => dispatch(modalsActions.hideModal())}
          >
            {t('modalRemove.cancel')}
          </Button>
          <Button type="submit" variant="danger" onClick={() => handleRemove(itemId)}>{t('modalRemove.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
