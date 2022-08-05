// https://ru.hexlet.io/challenges/js_react_modals_exercise

import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const getModal = (modalType) => modals[modalType];

export default getModal;
