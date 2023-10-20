import type { Schema, Attribute } from '@strapi/strapi';

export interface LessonsLessonsdescription extends Schema.Component {
  collectionName: 'components_lessons_lessonsdescriptions';
  info: {
    displayName: 'lessonsdescription';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    time: Attribute.String;
    content: Attribute.RichText;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'lessons.lessonsdescription': LessonsLessonsdescription;
    }
  }
}
