import expect from 'expect';
import reducer from '../../src/reducers/query';
import * as types from '../../src/constants';

describe('query reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isPending: false,
      result: [],
      lastQuery: '',
      recentQueries: [],
      savedQueries: []
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
            date: receivedAt,
            status: true
          }
        ],
        isPending: false,
        lastQuery: sql,
        result
      });
  });

  it('should handle QUERY_FAILURE', () => {
    const error = 'some error message';
    const sql = 'select * from table';
    const receivedAt = Date.now();

    expect(
      reducer({}, {
        type: types.QUERY_FAILURE,
        receivedAt,
        error,
        sql
      })).toEqual({
        isPending: false,
        lastQuery: sql,
        recentQueries: [
          {
            id: 0,
            sql,
            date: receivedAt,
            status: false
          }
        ]
      });
  });

  it('should handle QUERY_SAVE', () => {
    const sql = 'select salary from sample_07 where salary > 80000';
    const title = 'High salaries';
    const description = 'Query get the salaries higher than 80000';

    expect(
      reducer({}, {
        type: types.QUERY_SAVE,
        description,
        title,
        sql
      })).toEqual({
        savedQueries: [
          {
            id: 0,
            description,
            title,
            sql
          }
        ]
      });
  });

  it('should handle QUERY_DELETE', () => {
    expect(
      reducer({
        savedQueries: [
          {
            id: 0,
            description: 'Query get the salaries higher than 80000',
            title: 'High salaries',
            sql: 'select salary from sample_07 where salary > 80000'
          }
        ]
      }, {
        type: types.QUERY_DELETE,
        id: 0
      })).toEqual({
        savedQueries: []
      });
  });
});
