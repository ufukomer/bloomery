import expect from 'expect';
import reducer from '../../reducers/columns';
import * as types from '../../constants';

describe('columnsByTable reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({});
  });

  it('should handle COLUMN_REQUEST', () => {
    const table = 'customers';

    expect(
      reducer({}, {
        type: types.COLUMN_REQUEST,
        table
      })).toEqual({
        [table]: {
          isPending: true,
          items: []
        }
      }
    );
  });

  it('should handle COLUMN_SUCCESS', () => {
    const table = 'customers';

    expect(
      reducer({}, {
        type: types.COLUMN_SUCCESS,
        columns: [
          {
            name: 'id',
            type: 'int'
          },
          {
            name: 'name',
            type: 'string'
          }
        ],
        table
      })).toEqual({
        [table]: {
          isPending: false,
          items: [
            {
              name: 'id',
              type: 'int'
            },
            {
              name: 'name',
              type: 'string'
            }
          ]
        }
      }
    );
  });

  it('should handle COLUMN_FAILURE', () => {
    const table = 'customers';
    const error = 'some error message';

    expect(
      reducer({}, {
        type: types.COLUMN_FAILURE,
        table,
        error
      })).toEqual({
        [table]: {
          isPending: false,
          items: []
        }
      }
    );
  });
});
