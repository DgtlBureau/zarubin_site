---
title: '§ 2. How the Internet Works'
description: 'This question is designed to understand how a person thinks.'
image: ''
date: '21-03-2024'
readingTime: ''
category: 'Insights'
subCategory: 'News'
tag: 'Management'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
---

I enjoy asking the following question during interviews:
"Can you explain how the internet works?"

This question is designed to understand how a person thinks. The response can reveal the individual's strengths and their approach to problem-solving in similar situations.

A client once asked me:
"How can we determine at what database size the loading speed will start to frustrate users?"

The context was that we were developing a mobile application—an aggregator for shelters—and the conversation turned to load capacity. Depending on who reads this question, different interpretations of the answer may arise. I see four possible perspectives, ranging from simple to more advanced:

1. The speed of the mobile application does not depend on the database size;
2. The loading speed will start to irritate users once the database reaches 10,000 dogs;
3. The loading speed depends on the number of database queries. The database can store millions of records, minimal infrastructure will cost 300 rubles and handle 50 requests per second, which is approximately 1,000 users per month;
4. The application’s loading speed depends on how the application is built, how well queries are cached on the front-end and back-end, and what server infrastructure supports the admin panel.

I am sure that if desired, one could come up with many other ways to answer this question. If you ask a designer, they might consider the UX aspect. But the important thing is that any professional understands that sometimes the simplest answer is much better than overloading with information. This is especially true because, for the client, the database is directly in the application, and they may not know the principles of REST architecture. And explaining simply is something we tend to struggle with.

We simplify the answer to one question, then to another, and the client gets the impression that everything is quite simple and that they fully understand how everything works. Suddenly, a contradictory situation arises, and the professional decides to unload all the technical details! Unfortunately, in such a situation, convincing the client of their misconception is unlikely. So, who is right?

The answer is simple: learn to explain complex things in simple terms and use numbers. Everyone understands numbers. Just don't discuss traffic volumes or the number of requests! I would choose scenario number 3 from the examples above. It gives the client food for thought and provides us with a common ground for further discussion.

Value your time and the client’s time.
