import { SAVE_TEXT } from '../constants';

export default function text(state = '', action) {
  switch (action.type) {
    case SAVE_TEXT:
      return action.text;
    default:
      return state;
  }
}
