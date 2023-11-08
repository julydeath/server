"use strict";
// @ts-ignore

/**
 * quiz-score controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::quiz-score.quiz-score",
  // @ts-ignore
  ({ strapi }) => ({
    async create(ctx) {
      // @ts-ignore
      const { username, email, title, score } = ctx.request.body;
      try {
        await strapi.service("api::order.order").create({
          data: { username, email, courseTitle: title, score },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
);
