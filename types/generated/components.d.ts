import type { Schema, Attribute } from '@strapi/strapi';

export interface LessonsLessonsdescription extends Schema.Component {
  collectionName: 'components_lessons_lessonsdescriptions';
  info: {
    displayName: 'lessonsdescription';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    time: Attribute.String;
    content: Attribute.RichText;
  };
}

export interface QuizQuizOptions extends Schema.Component {
  collectionName: 'components_quiz_quiz_options';
  info: {
    displayName: 'quizOptions';
  };
  attributes: {
    options: Attribute.String;
  };
}

export interface QuizQuiz extends Schema.Component {
  collectionName: 'components_quiz_quizzes';
  info: {
    displayName: 'quiz';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    correctAnswer: Attribute.String;
    description: Attribute.Text;
    options: Attribute.Component<'quiz.quiz-options', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'lessons.lessonsdescription': LessonsLessonsdescription;
      'quiz.quiz-options': QuizQuizOptions;
      'quiz.quiz': QuizQuiz;
    }
  }
}
