import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT } from '../constants';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const datesList = [
  moment(),
  moment().add(1, 'days'),
  moment().add(3, 'days'),
  moment().add(9, 'days'),
  moment().add(10, 'days'),
  moment().add(11, 'days'),
  moment().add(12, 'days'),
  moment().add(13, 'days'),
];

const TestInput = props => (
  <div style={{ marginTop: 16 }} >
    <input
      {...props}
      type="text"
      style={{
        height: 48,
        width: 284,
        fontSize: 18,
        fontWeight: 200,
        padding: '12px 16px',
      }}
    />
  </div>
);
const TestPrevIcon = props => (
  <span style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px'
    }}
  >
    Prev
  </span>
);
const TestNextIcon = props => (
  <span style={{
    border: '1px solid #dce0e0',
    backgroundColor: '#fff',
    color: '#484848',
    padding: '3px'
    }}
  >
    Next
  </span>
);
const monthPrices = {
  '2016.12.11': '11435₽',
  '2016.12.17': '18628₽',
  '2016.12.15': '51672₽',
  '2016.12.16': '62532₽',
  '2016.12.07': '16777₽',
  '2016.12.05': '4085₽',
  '2016.12.03': '18240₽',
  '2016.12.18': '51209₽',
  '2016.12.13': '30625₽',
  '2016.12.25': '62.5k ₽',
  '2016.11.26': '131€',
  '2016.12.09': '$158',
  '2016.12.10': '12673₽',
  '2016.12.23': '15643₽',
  '2016.12.06': '29425₽',
  '2016.12.02': '19705₽',
  '2016.12.20': '32102₽',
  '2016.12.19': '59776₽',
  '2016.11.29': '17098₽',
  '2016.12.21': '32675₽',
  '2016.12.24': '42024₽',
};

storiesOf('DateRangePicker', module)
  .add('default', () => (
    <DateRangePickerWrapper />
  ))
  .add('as part of a form', () => (
    <div>
      <DateRangePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  ))
  .add('single month', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
    />
  ))
  .add('anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .add('vertical', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .add('vertical anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        orientation={VERTICAL_ORIENTATION}
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .add('horizontal with portal', () => (
    <DateRangePickerWrapper
      withPortal
    />
  ))
  .add('horizontal with fullscreen portal', () => (
    <DateRangePickerWrapper withFullScreenPortal />
  ))
  .add('vertical with full screen portal', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
    />
  ))
  .add('with clear dates button', () => (
    <DateRangePickerWrapper
      showClearDates
    />
  ))
  .add('reopens DayPicker on clear dates', () => (
    <DateRangePickerWrapper
      showClearDates
      reopenPickerOnClearDates
    />
  ))
  .add('does not autoclose the DayPicker on date selection', () => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
    />
  ))
  .add('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <DateRangePickerWrapper
        showClearDates
        startDatePlaceholderText="入住日期"
        endDatePlaceholderText="退房日期"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
          clearDates: '清除日期',
        }}
      />
    );
  })
  .add('with custom display format', () => (
    <DateRangePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .add('with custom arrows', () => (
    <DateRangePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .add('with minimum nights set', () => (
    <DateRangePickerWrapper
      minimumNights={3}
    />
  ))
  .add('allows a single night', () => (
    <DateRangePickerWrapper
      minimumNights={0}
    />
  ))
  .add('allows all days', () => (
    <DateRangePickerWrapper
      isOutsideRange={day => false}
    />
  ))
  .add('allows next two weeks only', () => (
    <DateRangePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
    />
  ))
  .add('with outside days enabled', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .add('with some blocked dates', () => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .add('with month specified on open', () => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment('04 2017', 'MM YYYY')}
    />
  ))
  .add('blocks fridays', () => (
    <DateRangePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
    />
  ))
  .add('with date prices', () => (
    <DateRangePickerWrapper
      monthInfo={monthPrices}
      monthInfoDateFormat={'YYYY.MM.DD'}
    />
  ));
