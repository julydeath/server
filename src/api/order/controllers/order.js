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
    const { products, username, email } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::course.course")
            .findOne(product.id);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.slug,
              },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: product.attributes.quantity,
          };
        })
      );

      console.log({ lineItems });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/purchase-completed",
        cancel_url: process.env.CLIENT_URL,
        line_items: lineItems,
      });

      await strapi.service("api::order.order").create({
        data: { username, products, stripeSessionToken: session.id },
      });

      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
}));
