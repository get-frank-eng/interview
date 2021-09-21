# Frank Engineering Interview

We're so glad you're here. This interview is designed for you to show us what you can do.

## The task

We have set up an HTTP server in the `/server` directory. It exposes a single paginated endpoint. Your task is to write a client for this endpoint that paginates through all data on all pages, and does some data processing. Your client can be in any language. **The purpose of the client is to find the comment author with the most net upvotes (upvotes minus downvotes)**. You can output this to `stdout`, put it on a webpage, or display it in any other way you see fit. 

Put another way: feel free to log your answer to the console, or put it somewhere in a webpage. Do whatever moves you and whatever you have time for. The most important part of this problem, however, is not how you display your answer. It is how you find it! 

To start the server, cd into the server directory, run `npm install` to install dependences, and then run `$ npm start`. Note: you will need to have npm installed on your machine. Let us know if you need some extra time in order to do this. 

> 🌶🌶 If you want to add a little spiciness to this exercise, you can optionally set the `FLAKY` environment variable to 1 on the server, and it will fail requests every so often. In this case, you would write your client to retry failed requests. 🌶🌶

## Example API request

```
## GET /posts?page=0

{
  hasNext: true,
  posts: [
    { ...
      comments: [
        {
          ...
          replies: [
            {
              ...
              replies: [...]
            }
          ]
        }
      ]
    },
    { ... },
    { ... },
    { ... },
    { ... },
    ...
  ]
}
```

## Data model


                                    ┌───────────┐
                                    │           │
                                   ╱│╲          │
    ┌──────────────┐      ┌──────────────────┐  │
    │** Post **    │      │** Comment **     │  │
    │- id          │      │- id              │  │
    │- title       │     ┌│- author          │  │
    │- author      │─────┼│- upvotes         │──┘
    │- comments    │     └│- downvotes       │   
    │- text        │      │- replies         │   
    └──────────────┘      │- text            │   
          ╲│╱             └──────────────────┘   
           │                      ╲│╱           
           │                       │            
           │             ┌──────────────────┐   
           │             │** User **        │   
           │             │- id              │   
           └─────────────│- name            │   
                         │                  │   
                         └──────────────────┘   
                         
                         

