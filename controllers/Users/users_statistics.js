const queries = require("../../crudOperations/Users/users_statistics");

const totalNumberOfUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfActiveUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfActiveUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfDeactivatedUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfDeactivatedUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const totalNumberOfBannedUsers = async (req, res) => {
  try {
    const data = await queries.totalNumberOfBannedUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfReportedUsers = async (req, res) => {
  try {
    const data = await queries.numberOfReportedUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfReportedPosts = async (req, res) => {
  try {
    const data = await queries.numberOfReportedPosts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfUserFriends = async (req, res) => {
  id = req.body.id;
  try {
    const data = await queries.numberOfUserFriends(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const numberOfUserPosts = async (req, res) => {
  id = req.body.id;
  try {
    const data = await queries.numberOfUserPosts(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const date = require("../../utils/date.js");
const getStats = async (req, res) => {
  const todayActiveUsers = await queries.getActiveUsersByDate(date.today.start,date.today.end);
  const todayDeactivatedUsers = await queries.getDeactivatedUsersByDate(date.today.start,date.today.end);
  const todayBannedUsers = await queries.getBannedUsersByDate(date.today.start,date.today.end);
  const yesterdayActiveUsers = await queries.getActiveUsersByDate(date.yesterday.start,date.yesterday.end);
  const yesterdayDeactivatedUsers = await queries.getDeactivatedUsersByDate(date.yesterday.start,date.yesterday.end);
  const yesterdayBannedUsers = await queries.getBannedUsersByDate(date.yesterday.start,date.yesterday.end);
  const thisMonthActiveUsers = await queries.getActiveUsersByDate(date.thisMonth.start,date.thisMonth.end);
  const thisMonthDeactivatedUsers = await queries.getDeactivatedUsersByDate(date.thisMonth.start,date.thisMonth.end);
  const thisMonthBannedUsers = await queries.getBannedUsersByDate(date.thisMonth.start,date.thisMonth.end);
  const lastMonthActiveUsers = await queries.getActiveUsersByDate(date.lastMonth.start,date.lastMonth.end);
  const lastMonthDeactivatedUsers = await queries.getDeactivatedUsersByDate(date.lastMonth.start,date.lastMonth.end);
  const lastMonthBannedUsers = await queries.getBannedUsersByDate(date.lastMonth.start,date.lastMonth.end);
  const thisYearActiveUsers = await queries.getActiveUsersByDate(date.thisYear.start,date.thisYear.end);
  const thisYearDeactivatedUsers = await queries.getDeactivatedUsersByDate(date.thisYear.start,date.thisYear.end);
  const thisYearBannedUsers = await queries.getBannedUsersByDate(date.thisYear.start,date.thisYear.end);
  const lastYearActiveUsers = await queries.getActiveUsersByDate(date.lastYear.start,date.lastYear.end);
  const lastYearDeactivatedUsers = await queries.getDeactivatedUsersByDate(date.lastYear.start,date.lastYear.end);
  const lastYearBannedUsers = await queries.getBannedUsersByDate(date.lastYear.start,date.lastYear.end);
  const stats = {
    today: {
      activeUsers: todayActiveUsers,
      deactivatedUsers: todayDeactivatedUsers,
      bannedUsers: todayBannedUsers,
    },
    yesterday: {
      activeUsers: yesterdayActiveUsers,
      deactivatedUsers: yesterdayDeactivatedUsers,
      bannedUsers: yesterdayBannedUsers,
    },
    thisMonth: {
      activeUsers: thisMonthActiveUsers,
      deactivatedUsers: thisMonthDeactivatedUsers,
      bannedUsers: thisMonthBannedUsers,
    },
    lastMonth: {
      activeUsers: lastMonthActiveUsers,
      deactivatedUsers: lastMonthDeactivatedUsers,
      bannedUsers: lastMonthBannedUsers,
    },
    thisYear: {
      activeUsers: thisYearActiveUsers,
      deactivatedUsers: thisYearDeactivatedUsers,
      bannedUsers: thisYearBannedUsers,
    },
    lastYear: {
      activeUsers: lastYearActiveUsers,
      deactivatedUsers: lastYearDeactivatedUsers,
      bannedUsers: lastYearBannedUsers,
    },
  };
    return res.status(200).json(stats);
};

module.exports = {
  totalNumberOfUsers,
  totalNumberOfActiveUsers,
  totalNumberOfDeactivatedUsers,
  totalNumberOfBannedUsers,
  numberOfReportedUsers,
  numberOfReportedPosts,
  numberOfUserFriends,
  numberOfUserPosts,
  getStats,
};
