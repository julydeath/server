module.exports = {
  routes: [
    {
      method: "GET",
      path: "/user-courses",
      handler: "user-courses.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
