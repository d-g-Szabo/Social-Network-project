# week09-assignment

Project: Build a Social Network app

# Requirements:

🎯 Use Clerk.com to set up user signup and login.

🎯 Use the Clerk userId to associate posts with a user.

🎯 Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to /user/[userId].

🎯 Enable users to create posts associated with the userId, and display those posts on the user's profile page

🎯 Show a 404 error if a user profile doesn't exist

🎯 Use at least 1 Radix UI Primitive or similar (I used shadcn)

I met all the requirements for this assignment.

# User Stories:

    🐿️ As a user, I am able to sign up for an account and create a user profile
    🐿️ As a user, I am able to log in and out of my account
    🐿️ As a user, I am able to create posts on my profile timeline
    🐿️ As a user, I am able to see all posts by all users on a global timeline

Stretch Stories:

    🐿️ As a user, I am able to see a list of other user's posts and/or profiles on the site
    🐿️ As a user, I am able able to visit other user profiles
    🐿️ As a user, I am able to follow other users
    🐿️ As a user, I am able to like posts I think are good, and see how many likes a post has

# Wireframe:

![](https://github.com/d-g-Szabo/react-full-stack-app/blob/ca99ec2c35d12d46869c01f128fd5ed8eed837d0/client/public/database_driven_full_stack_react___express_app_wireframe1.jpg)

# Component flow:

![](https://github.com/d-g-Szabo/react-full-stack-app/blob/ca99ec2c35d12d46869c01f128fd5ed8eed837d0/client/public/database_driven_full_stack_react_express_app-component-tree.jpg)

# Database schema:

![](https://github.com/d-g-Szabo/react-full-stack-app/blob/ca99ec2c35d12d46869c01f128fd5ed8eed837d0/client/public/database_driven_full_stack_react___express_app-database-schema.jpg)

# Trello project planning:

![](https://github.com/d-g-Szabo/react-full-stack-app/blob/7ebfb55698386939315740c6befbb125b88703ae/client/public/database_driven_full_stack_react___express_app-trello.jpg)

# Stretch Goals:

🏹 Enable users to visit other user profiles after seeing their posts on a global timeline

🏹 A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in

🏹 Use TypeScript

# Reflections:

What went really well, and what could have gone better?
Using shadcn was easy, but I think I could have less pages. I feel like I overcomplicated the folder structure.

Useful external sources that helped me complete the assignment (e.g Youtube tutorials).
https://ui.shadcn.com/docs/installation/next

Errors or bugs I encountered while completing your assignment.
I had a few bugs with Clerk when I wanted to use "currentUser," but it was fine after I had figured out the object structure.

Requesting feedback about a specific part of your submission:
I could have reused components and made fewer folders(pages) if I had structured my site better.
