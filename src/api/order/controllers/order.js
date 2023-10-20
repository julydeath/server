"use strict";
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // @ts-ignore

    // retrieve item information
    const { products, username, email } = ctx.request.body;
    console.log({ ctx });
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi.service("api::course.course").findOne(1);

          return {
            // price_data: {
            //   currency: "inr",
            //   product_data: {
            //     name: item.title,
            //   },
            //   unit_amount: Math.round(item.price * 100),
            // },
            // quantity: 1,
            price: item.priceId,
            quantity: 1,
          };
        })
      );

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/purchase-completed",
        cancel_url: process.env.CLIENT_URL,
        line_items: lineItems,
      });

      //create a stripe payment link
      const paymentLink = await stripe.paymentLinks.create({
        line_items: lineItems,
        after_completion: {
          type: "redirect",
          redirect: {
            url: process.env.CLIENT_URL + "/purchase-completed",
          },
        },
      });

      // create the item
      await strapi.service("api::order.order").create({
        data: { username, products, stripeSessionToken: session.id },
      });

      return { url: paymentLink.url, id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
}));
