---
title: 'TeamPCP Pulled 3,800 Repos Out of GitHub Through a VS Code Extension. What AI-Dev Teams Should Do This Week'
description: 'A backdoored Nx Console extension gave attackers a foothold inside GitHub on May 19. Worm-style spread, CI/CD credentials, 11-minute detection window. The boring hygiene fixes every Copilot/Cursor team owes itself.'
image: '/assets/images/info/ai-audit-trail-architecture.webp'
imageSource: 'The BrightByte, based on GitHub disclosure (May 20, 2026)'
date: '20-05-2026'
readingTime: '4 min'
category: 'Insights'
subCategory: 'News'
tag: 'AI security, GitHub breach, TeamPCP, supply chain attack, VS Code extension, Shai-Hulud worm, repo hygiene, CI/CD security'
authorName: 'Vitaliy Zarubin'
authorImage: '/assets/images/author/avatar.png'
faq:
  - question: 'What happened in the TeamPCP GitHub breach?'
    answer: 'On May 19, 2026 a poisoned version of the Nx Console VS Code extension was published. It was live for about 11 minutes before takedown, but that was enough for a GitHub employee to auto-update and get infected. The attacker group (tracked as UNC6780 / TeamPCP) used a self-replicating worm called Mini Shai-Hulud to harvest CI/CD credentials, pivot inside the org, and exfiltrate roughly 3,800 internal repositories. GitHub disclosed on May 20.'
  - question: 'Was customer data exposed?'
    answer: 'GitHub says no, only internal repos. Customer-hosted data sits outside that perimeter. If that changes, US state breach notification clocks start the moment exposure is confirmed.'
  - question: 'Why is this relevant if I do not work at GitHub?'
    answer: 'Same attack pattern hits any team that uses VS Code, Cursor, or any IDE with an auto-updating extension marketplace. Copilot, Claude Code, Cursor: they all live in the same trust boundary. The extension shop is the new npm. Treat it that way.'
  - question: 'How fast can a malicious extension actually compromise me?'
    answer: 'Nx Console has 2.2 million installs. Auto-update is on by default. The attacker needs your machine to fetch the bad version once. From there the worm grabs whatever tokens are in your shell, .env files, gh CLI config, AWS credentials file. Anything a process running as you can read.'
---

GitHub got hit. On May 19 a poisoned Nx Console extension shipped through the VS Code marketplace. It was up for eleven minutes. That window was enough for an employee to auto-update, for the worm to grab their CI/CD tokens, and for the attacker group (TeamPCP, tracked as UNC6780) to pivot into roughly 3,800 internal repositories before anyone noticed.

GitHub disclosed the breach the next day. Customer data, they say, was not touched. We will see.

Here is the part that should keep founders up at night. The attacker did not exploit GitHub. They exploited a developer's IDE. Every team using Copilot, Cursor, Claude Code, Continue, Cody, every team running an AI assistant, runs it through an extension marketplace with auto-update enabled by default and minimal code review. That is the same surface that just compromised the world's largest code host.

If this sounds familiar, it should. Same playbook hit Aqua's Trivy, CheckMarx KICS, LiteLLM, TanStack, MistralAI in the last few months. The worm has a name now (Mini Shai-Hulud) and a pattern: poison a package, steal CI tokens, publish more poisoned packages, repeat.

What boring hygiene actually moves the needle? Here is the list we ran for our own clients this week, in priority order.

1. **Pin extension versions, disable marketplace auto-update.** VS Code: `extensions.autoUpdate: false` and `extensions.autoCheckUpdates: false`. Yes, you will manually update. That is the point.
2. **Turn on GitHub secret scanning and push protection.** Both are free for public and private repos now. Push protection blocks the commit before the secret leaves the laptop. Five minutes of admin work.
3. **Rotate every CI/CD token that has ever touched a developer machine.** Quarterly is the floor. Monthly is sane. The Nx incident leaked tokens that had been valid since 2024.
4. **Move CI to OIDC, kill long-lived secrets.** GitHub Actions → AWS, GCP, Azure all support short-lived federated credentials. No more `AWS_SECRET_ACCESS_KEY` in repo secrets. (This one is annoying to set up the first time. Worth it.)
5. **Sandbox the AI assistant.** Run Claude Code or Cursor inside a devcontainer or VM that does not have your prod credentials mounted. If your AI agent gets a malicious instruction, the blast radius stops at the container.
6. **Review what you commit.** This sounds obvious. It is not, because Copilot will happily autocomplete an `OPENAI_API_KEY=sk-...` line if you started typing it. Force a human pass on every PR. Yes, including the ones the AI wrote.
7. **Inventory your extensions, quarterly.** Anyone on the team using a 200-install extension by a developer with no GitHub history? That is a supply chain risk. We dropped four extensions on our own machines yesterday for exactly this reason.

There is a longer conversation here about whether IDE marketplaces need real package signing, mandatory code review, and provenance. That is somebody else's fight. While the regulators and platforms argue about it, your job is to make sure that the eleven-minute window between a malicious push and a takedown does not turn into the worst week of your year.

We work with fintech and biotech teams who cannot afford a TeamPCP-style headline. If you want a one-page audit of your dev environment posture against this attack pattern, [we can run that](/career) in a week.
