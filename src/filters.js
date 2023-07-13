import moment from "moment";

export const filters = {
  uppercase: function (value) {
    return value.toUpperCase();
  },
  timeAgo: function (value) {
    if (value) {
      // Calculate the difference between the current date and the provided date
      return moment(value).fromNow();
    }
  },
};
