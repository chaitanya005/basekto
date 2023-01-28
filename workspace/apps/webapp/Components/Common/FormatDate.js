import moment from 'moment';

const FormatDate = ({ date, format }) => {
  const formattedDate = moment(date).format(format);
  return <div>{formattedDate}</div>;
};

export default FormatDate;
