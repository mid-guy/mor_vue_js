import moment from 'moment';
export const convertDate = (time) => {
  return moment(time).format('DD/MM/YYYY')
}