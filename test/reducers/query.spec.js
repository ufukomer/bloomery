import expect from 'expect';
import reducer from '../../reducers/query';
import * as types from '../../constants';

describe('query reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isPending: false,
      result: [],
      lastQuery: '',
      recentQueries: []
    });
  });

  it('should handle QUERY_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.QUERY_REQUEST,
        sql: 'select * from table'
      })).toEqual({
        isPending: true
      }
    );
  });

  it('should handle QUERY_SUCCESS', () => {
    const sql = 'select * from table';
    const receivedAt = Date.now();
    const result = [
      {
        code: '00-0000',
        description: 'All Occupations',
        total_emp: '135185230',
        salary: '42270'
      },
      {
        code: '11-0000',
        description: 'Management occupations',
        total_emp: '6152650',
        salary: '100310'
      }
    ];

    expect(
      reducer({}, {
        type: types.QUERY_SUCCESS,
        receivedAt,
        result,
        sql
      })).toEqual({
        recentQueries: [
          {
            id: 0,
            sql,
            date: receivedAt
          }
        ],
        isPending: false,
        lastQuery: sql,
        result
      }
    );
  });

  it('should handle QUERY_FAILURE', () => {
    const error = 'some error message';

    expect(
      reducer({}, {
        type: types.QUERY_FAILURE,
        error
      })).toEqual({
        isPending: false,
        error
      }
    );
  });
});
