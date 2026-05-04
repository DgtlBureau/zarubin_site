---
title: 'Supply Chain Attacks 2024-2026: XZ, npm, and PyPI Lessons'
description: 'How the XZ Utils backdoor, polyfill.io, and Solana web3.js compromises worked — and the SBOM, SLSA, Sigstore controls that would catch them.'
image: '/assets/images/info/aida-l-6y5iySR_UXc-unsplash.webp'
date: '01-05-2026'
readingTime: '12 min'
category: 'Expertise'
subCategory: 'IT Service'
tag: 'Supply chain attacks, XZ Utils, npm malware, PyPI typosquatting, SBOM, SLSA, Sigstore'
authorName: 'Daniella Mitchell'
authorImage: '/assets/images/author/daniella_mitchell.jpg'
faq:
  - question: 'What is CVE-2024-3094?'
    answer: 'A backdoor planted in xz-utils versions 5.6.0 and 5.6.1 by a long-running social engineering campaign. CVSS 10.0. The payload hooked sshd via liblzma and would have given remote unauthenticated code execution to anyone holding the attackers Ed448 key. Discovered by Andres Freund on 29 March 2024 because of a 500ms SSH login delay he noticed while benchmarking PostgreSQL.'
  - question: 'Was the XZ Utils backdoor exploited in production?'
    answer: 'No confirmed exploitation. The malicious versions reached Debian sid, Fedora 40 Beta and 41, openSUSE Tumbleweed, Kali Linux snapshots, and Arch Linux. Stable Debian, Ubuntu LTS, and RHEL never shipped them. We got lucky — and we got lucky because one engineer was paying attention to a benchmark.'
  - question: 'Does npm audit detect malicious packages?'
    answer: 'Only known CVEs. It is useless for zero-day malware, which is what most supply chain attacks are. For behavioural detection you need Socket.dev, Snyk, or OSV-Scanner. For artifact integrity, npm audit signatures (npm 9.5+) verifies sigstore-signed packages. Run both.'
  - question: 'What is SLSA?'
    answer: 'Supply-chain Levels for Software Artifacts. A graduated framework from the OpenSSF defining four levels of build integrity, from "we have a build" (L1) to "hermetic, two-party reviewed, signed provenance" (L4). Most production teams sit at L1 or L2 and aim for L3.'
  - question: 'What is the difference between typosquatting and dependency confusion?'
    answer: 'Typosquatting publishes a package with a name close to a popular one (requets vs requests) and waits for typos. Dependency confusion publishes a public package that shares a name with a private internal package — and many package managers default to pulling the higher version, even if it is the public one. Different vector, same outcome: malicious code runs in your build.'
---

# Supply Chain Attacks 2024-2026: XZ, npm, and PyPI Lessons

*On 29 March 2024, a Microsoft engineer named Andres Freund posted to oss-security with a subject line that read like a Friday afternoon thought experiment: "backdoor in upstream xz/liblzma leading to ssh server compromise." He had been benchmarking PostgreSQL changes. He noticed sshd was burning unusual CPU and that logins took an extra 500 milliseconds. He pulled on the thread.*

*[He found a backdoor that had taken nearly two years to plant.](https://www.openwall.com/lists/oss-security/2024/03/29/4)*

That story has been told a thousand times now, and I am not going to retell it for the thousandth. What I want to talk about is the part of the story that most engineering teams still have not internalised — that the attack worked because every single defence-in-depth control we tell ourselves we have was useless against it. SBOMs would not have flagged it. `npm audit` equivalents would not have flagged it. Code review would not have flagged it. The only thing that flagged it was one person noticing a 500ms anomaly.

We do not get to plan around that. So let us talk about what we *can* plan around, with three concrete cases from 2024-2025 and the controls that actually move the needle.

## XZ Utils: two years of patient social engineering

The mechanics of [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) deserve a single paragraph of respect because of how clever they were. A maintainer identity called "Jia Tan" began contributing to xz-utils in late 2021. Slowly, methodically, they built trust with the original author Lasse Collin — who at one point [posted publicly](https://tukaani.org/xz-backdoor/) about feeling overwhelmed and looking for help. Jia Tan stepped up. By February 2024 they pushed version 5.6.0, which contained a malicious M4 macro in the build system. The macro injected obfuscated object code into liblzma. Because systemd links liblzma, and many distros patch sshd to depend on systemd notifications, sshd indirectly loaded the backdoor. The payload hooked `RSA_public_decrypt` via GNU IFUNC and gated remote code execution on a specific Ed448 key.

That is the technical part. The non-technical part is what should haunt every engineering org reading this.

Two years of trust building. Sock-puppet accounts in the mailing list pressuring Lasse to hand over more responsibility. Test files in the source tree that contained the encrypted payload — disguised as binary test data, which tooling routinely ignores. Every layer of the open source contribution model was used as a vector. There was no signature failure, no CVE in a dependency, no malicious typosquat. There was just a maintainer who became a different person somewhere along the way.

The lesson is not "audit your maintainers." Nobody can audit maintainers at scale. The lesson is that trust in the supply chain has a shape, and you have to assume that shape will eventually be exploited at the slowest, most patient layer — the human one. That shifts what defence looks like.

## npm in 2024-2025: three patterns, three lessons

While XZ was the headline, the JavaScript ecosystem absorbed a steady drumbeat of attacks that mostly worked. Three are worth dissecting.

**Polyfill.io (June 2024).** The polyfill.io domain had been, for years, a quiet piece of plumbing on roughly 100,000 websites — including JSTOR, Intuit, and the World Economic Forum. In February 2024 a Chinese company called Funnull bought the domain. By June, [Sansec reported](https://sansec.io/research/polyfill-supply-chain-attack) that the new owners were injecting malware that redirected mobile users to gambling and scam sites. Cloudflare and Fastly responded within hours by auto-rewriting requests to safe mirrors, which is the only reason the damage was limited. The sites that linked to `cdn.polyfill.io` directly — a script tag, no SRI, no fallback — were silently compromised the moment Funnull flipped the switch.

The lesson here is uncomfortable. A `<script src>` to a third-party domain is a permanent trust delegation. If the domain changes hands, your site changes hands. SRI hashes would have stopped this dead. Strict CSP would have stopped this dead. Almost nobody had either.

**Lottie-Player (October 2024).** [GHSA-7v68-3pr5-h3cr](https://github.com/advisories/GHSA-7v68-3pr5-h3cr): `@lottiefiles/lottie-player` versions 2.0.5, 2.0.6, and 2.0.7 were compromised via a stolen npm token. The injected payload was a wallet-draining script targeting Web3 sites. Within hours of the publish, a developer at a crypto firm noticed an unusual transaction, traced it back to a Lottie animation, and the chain was unwound. The stolen-token vector keeps recurring — same story as `event-stream` in 2018, same story as `ua-parser-js` in 2021, same story now. The fix is not novel: enforce 2FA for publish, scope tokens to specific packages, sign packages with sigstore, and verify signatures on install. The npm ecosystem has all of this available. Most projects use none of it.

**@solana/web3.js (December 2024).** [CVE-2024-54134](https://github.com/advisories/GHSA-w3ah-3xj7-r4wr): versions 1.95.6 and 1.95.7 of the official Solana web3 SDK shipped with a backdoor that exfiltrated private keys to a hardcoded wallet address. Estimated $184,000 drained in roughly five hours before the package was pulled. Same root cause as Lottie — credential compromise on a maintainer account.

Three attacks, one shared lesson: in a world where credentials get stolen routinely, the integrity of the package you install needs to be verifiable from something other than "the registry says so."

That something else exists now. It is called [Sigstore](https://sigstore.dev), and `npm audit signatures` will check it for you.

## PyPI: the long tail of typosquatting and confusion

Python's package ecosystem has a different shape of problem. PyPI does not require namespace ownership for similar names, and pip's resolver does not preferentially weight private indexes. That gives you two weak points.

**Typosquatting.** Checkmarx and Phylum reported throughout 2024 that PyPI removed hundreds of malicious typosquats per month — `requets` for `requests`, `colorama-py` for `colorama`, `selemium` for `selenium`. The payload pattern is consistent: `setup.py` runs at install time, exfiltrates environment variables and SSH keys, sometimes drops a persistence mechanism. Most enterprises catch zero of these because their scanners look for known CVEs, and a five-day-old malicious package has none.

**Dependency confusion.** The classic example is the December 2022 [pytorch-nightly compromise](https://pytorch.org/blog/compromised-nightly-dependency/). PyTorch had an internal package called `torchtriton` that shipped via their custom index. Someone published a package with the same name on public PyPI. pip's default behaviour is to resolve from any configured index and prefer the higher version. The public package was rev'd higher. People who installed pytorch-nightly with the wrong index priority got the malicious one. The payload exfiltrated `/etc/passwd`, SSH keys, environment variables — the usual.

The fix for typosquatting is behavioural analysis at install time (Socket.dev, Snyk, JFrog Curation) plus an internal proxy that quarantines new packages for a cooling period. The fix for dependency confusion is namespace ownership — register every internal package name on public PyPI as a stub, force the resolver to use a single index, set explicit version pins. Neither is technically hard. Both require somebody to actually own dependency hygiene as a job, which is the part most teams skip.

## Why traditional SCA tools missed these attacks

Software Composition Analysis was supposed to be the answer to supply chain risk. Snyk, WhiteSource (now Mend), Black Duck, Sonatype IQ — billions of dollars of tooling. It missed every case in this article on the first day. Why?

SCA tools are CVE matchers. They look at your `package.json` or `requirements.txt`, resolve versions, compare against the NVD and ecosystem advisories. A zero-day malicious package has no CVE on day zero. By the time the CVE lands — sometimes hours, sometimes weeks — the package is already deployed in production. SCA catches it on the *next* scan, not the one that matters.

This is not a knock on SCA. It is the only practical answer to a different question — *do my dependencies have known vulnerabilities?* It is just the wrong tool for *is this package what it claims to be?*

The right tool for the second question is a combination of three things: artifact provenance (SLSA + Sigstore), behavioural analysis (Socket, Phylum), and runtime control (eBPF-based egress monitoring, network segmentation for build agents). None of these are new. All of them are underused. [Sonatype's State of the Software Supply Chain 2024](https://www.sonatype.com/state-of-the-software-supply-chain/introduction) reports more than 700,000 malicious packages found across npm, PyPI, and Maven since 2019, with a 156% year-over-year jump in 2024. The attacks scale faster than the average team's tooling.

## A realistic defence stack

I am going to keep this list ordered by what to do first, not by what is most fashionable.

1. **Generate SBOMs in CI for every build.** Use Syft or `cyclonedx-cli`. Attach as a release artifact. Sign with cosign. This is the cheapest control and unblocks every other control downstream.
2. **Pin and verify dependencies.** Lockfiles with integrity hashes (`package-lock.json`, `poetry.lock`, `Pipfile.lock`). Enable `--frozen-lockfile` or equivalent in CI. No floating versions in production builds. Period.
3. **Verify npm package signatures.** `npm audit signatures` since npm 9.5. Catches a class of attacks that nothing else catches. Add it as a CI gate.
4. **Restrict postinstall scripts in CI base images.** `npm config set ignore-scripts true` for build agents. Yes, it breaks some packages. The packages that need install-time arbitrary code execution are exactly the ones you should review by hand anyway.
5. **Run an internal package proxy.** Verdaccio, JFrog, or Sonatype Nexus. Allowlist mode. Quarantine new versions for a cooling period — even seven days catches most flash-malicious-publish events.
6. **Behavioural scanning.** Socket.dev for npm and PyPI, OSV-Scanner for cross-ecosystem CVE matching, Phylum if you have the budget. These look at install scripts, network calls, filesystem access — the things SCA does not.
7. **Adopt SLSA Level 3 for production builds.** Hermetic builds, two-party review, signed provenance. The OpenSSF [SLSA framework](https://slsa.dev) gives you the rubric. GitHub Actions has native support via the artifact attestations beta.
8. **Sign everything you ship with Sigstore/cosign.** Keyless signing via OIDC. No long-lived keys to leak. Verify on deploy.
9. **Treat your maintainer accounts like production credentials.** Hardware-backed 2FA, scoped tokens per package, named ownership, rotation on departure. The Lottie and Solana attacks both rode on stolen credentials. Stop making it easy.
10. **Subscribe to OSV and ecosystem advisories.** When a malicious package lands, the window between disclosure and your runtime impact is hours, not days. Build the muscle to ship a dependency rev fast.

## The uncomfortable conclusion

There is a version of this article that ends with a tidy summary about how SBOMs and SLSA and Sigstore make us safe. They do not. They make us safer. The XZ attack would have walked through all of them, because the attack was not an artifact problem. It was a trust problem.

The honest takeaway is that the open source supply chain is held together by individual humans who notice things. Andres Freund and his 500ms benchmark. The crypto dev who saw a weird Lottie transaction. The Sansec engineer who spotted the polyfill.io rewrite. Every win in this article was *somebody paying attention*.

Tools narrow the attack surface. They do not eliminate it. The thing engineering leaders should actually invest in is a team that has time to be curious about anomalies. That is the unfashionable, unscalable, and only durable defence we have.

Patch your dependencies. Sign your artifacts. And give your senior engineers a slack budget for "weird stuff in the build."

That is how the next XZ gets caught.
