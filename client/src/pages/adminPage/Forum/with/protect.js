import React from 'react';
import withAuth from '../../../../http/WithAuth';
import { CreateForum } from '../CreateForum';
import Forum from '../Forum';


export const CreateForumq = withAuth(CreateForum );
export const Forumq = withAuth(Forum );

