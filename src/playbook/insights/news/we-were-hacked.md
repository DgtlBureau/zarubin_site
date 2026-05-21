---
title: 'We are H*cked'
description: 'Discover how our game project server was hacked, the steps we took to recover, and the key lessons for securing digital infrastructure.'
image: '/assets/images/post/we_were_hacked.png'
date: '13-10-2024'
readingTime: ''
category: 'Insights'
subCategory: 'News'
tag: 'Information security, cyber attack recovery, server hacking, data protection'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
---


We were working on an exciting **web-based gaming project**. Our infrastructure was cloud-based, a carefully integrated setup of **CMS**, **Firebase** and a **web application** that fed data into a larger mobile application. The exchange of data between all these components was serious. Every move, every user action - everything had to be synchronised in real time to give our users the best possible gaming experience.

Everything went well. The system was running smoothly, with data flowing between the **Firebase backend**, our **CMS** and the **mobile app**. We were excited to see the progress as users began to interact with the game.

Then came Friday night. The nightmare began.
![Firebase architecture](https://imgur.com/S9Xasg5.jpg)

## The sudden silence: The servers stopped responding

At around 8pm, our alert system alerted us - but not in a good way. Our servers had stopped responding. At first we thought it was a minor problem - a glitch in the cloud, perhaps, something that could be fixed with a simple reboot.

We tried rebooting the servers. **Nothing.** No response. No pings. Silence.

We scrambled to investigate. Logging into our cloud hosting provider, we discovered that the **last database dump** was from two days ago. Everything after that was gone. **Gone.**

But there was hope. **Thank God for Firebase.** We were able to pull the real-time data from Firebase and save our user data and activity logs. But the core infrastructure - the database, the CMS, the web application - was compromised.

## The hacker's calling card: A ransom demand

Our security specialist dug deep into the system. What he found was chilling.

![](https://imgur.com/blIl2hl.jpeg)

The hackers had infiltrated our server, wiped the entire database and left a **new database** in its place. There was a message in it. A message that made our stomachs sink: "Pay the ransom in Bitcoin if you want your data back." They even had the nerve to leave a **contact on Signal**.

We had been compromised. Everything we had worked for was now being held hostage by faceless attackers.

## The server setup: Vulnerabilities we didn't see coming

Our server was configured with three containers: **sail**, **MySQL** and **Redis**. At first glance, everything seemed sound. But under the hood, we found the vulnerabilities that likely led to the attack.

1. **Redis** was exposed with an open port and no password. It was practically an invitation.
2. **Sail** was also open, intended to work through **Nginx reverse proxy** with **HTTPS** and **Let's Encrypt** certificates. But this setup may not have been as secure as we thought.
3. **MySQL** was secure from the outside, limited to local access, but it didn't matter - the attackers found another way in.

## The breach: How they got in

We checked the SSH access logs. No one had accessed the server via SSH. Our **root password** was complex enough to deter brute force attacks.

But there was a bigger problem. The **Laravel application logs** were empty at the time of the attack. This indicated that the hackers had wiped them clean after gaining access, leaving no trace of their movements.

With the **Redis** and **Sail** ports open, the attackers found a way in, exploited the system and gained access to the server's file system. From there, they were able to delete everything, including the database and logs.

## What we did next: Emergency Recovery Mode

We went into **emergency recovery mode**. The first priority was to **secure the system**. Here's what we did:

1. \*\*Changed all passwords: Every password, from service accounts to containers, was updated to use complex, strong passwords.
2. \*\*Shut down external access: We immediately shut down all external access to the Redis and Sail containers. No more exposed ports. Everything locked down.
3. \*\*Set up automatic backups: We set up daily backups with a 5 day retention. That way, even if we were attacked again, we wouldn't lose everything.
4. **Migrated to a new server: We didn't want to take any chances with a possible backdoor. We migrated everything to a **new server\*\* with an updated, hardened configuration.

## Lessons learned: Protecting ourselves going forward

The incident was a wake-up call. It wasn't just about rebooting the server. We had to rethink our entire security infrastructure.

- Continuous monitoring: We set up continuous monitoring of server and container activity to catch any suspicious behaviour early.
- Logs and dumps: We configured logs and database dumps to be automatically backed up to external, secure storage to avoid losing logs if attackers delete them.
- Redis and Sail: Redis was now protected by strong passwords and we closed the previously exposed ports. No more vulnerabilities in our container setup.
- Security Policies: We enforced strict security policies across the board, including password management via Vaultwarden and SSH key-based authentication.

## Final thoughts: A close call

This was a close call. Without **Firebase** and quick thinking, we could have lost even more. Our product and data were at risk, but we've come out stronger, more secure and with a renewed focus on **data protection**.

It's not just about having great features and a smooth user experience - security is everything. We learnt our lesson the hard way, but now we're better prepared.
