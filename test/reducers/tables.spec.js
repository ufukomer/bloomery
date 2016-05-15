import expect from 'expect';
import { tables, selectedTable } from '../../src/reducers/tables';
import * as types from '../../src/constants';

describe('selectedTable reducer', () => {
  it('should return initial state', () => {
    expect(
      selectedTable(undefined, {})
    ).toEqual('');
  });

  it('should handle TABLE_SELECT', () => {
    const table = 'customers';

    expect(
      selectedTable({}, {
        type: types.TABLE_SELECT,
        table
      })).toEqual(table);
  });
});

describe('tables reducer', () => {
  it('should return the initial state', () => {
    expect(
      tables(undefined, {})
    ).toEqual({
      isPending: false,
      didInvalidate: false,
      items: []
    });
  });

  it('should handle TABLE_INVALIDATE', () => {
    expect(
      tables({}, {
        type: types.TABLE_INVALIDATE,
        table: 'customers'
      })).toEqual({
        didInvalidate: true
      }
    );
  });

  it('should handle TABLE_REQUEST', () => {
    expect(
      tables({}, {
        type: types.TABLE_REQUEST
      })).toEqual({
        isPending: true,
        didInvalidate: false
      }
    );
  });

  it('should handle TABLE_SUCCESS', () => {
    const items = ['customers', 'sample_07', 'sample_08'];

    expect(
      tables({}, {
        type: types.TABLE_SUCCESS,
        items
      })).toEqual({
        isPending: false,
        items,
        didInvalidate: false
      }
    );
  });

  it('should handle TABLE_FAILURE', () => {
    const error = 'some error message';

    expect(
      tables({}, {
        type: types.TABLE_FAILURE,
        error
      })).toEqual({
        isPending: false,
        didInvalidate: true
      }
    );
  });
});
