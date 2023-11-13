'use strict';

/**
 * completed-lesson service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::completed-lesson.completed-lesson');
