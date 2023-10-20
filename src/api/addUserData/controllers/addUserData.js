"use strict";

/**
 * A set of functions called "actions" for `addUserData`
 */

module.exports = {
  async update(ctx) {
    const { id } = ctx.params; // Assuming you have the id of the record you want to update
    const { user } = ctx.state; // Get the authenticated user

    // Check if the current user is the owner of the record before allowing the update
    // const record = await strapi.services.mycontenttype.findOne({
    //   id,
    //   user: user.id,
    // });
    const record = await strapi
      .query("api::course.course")
      .findOne({ id, user: user.id });

    if (!record) {
      return ctx.notFound("No record found");
    }

    // Perform the update of the user field
    const updatedRecord = await strapi.services.mycontenttype.update(
      { id },
      { user: "new user value" }
    );

    return updatedRecord;
  },
};
