---
setup: |
    import ReactCounter from '../../components/ReactCounter.jsx'

title: Astro now has Draft Posts in Markdown!
author: Sarah
date: '2022-01-26'
draft: true
description: "An exciting contribution by a community member has us all drafting new posts..."
layout: ../../layouts/MarkdownPostLayout.astro
slug: draft-markdown-posts-in-astro
tags: ["astro", "markdown", "blogging"]
---
Thanks to [Pranav/obnoxiousnerd](https://github.com/obnoxiousnerd), Astro [v0.22.15](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md#02215) now supports adding a `draft: true` field to the front matter of a Markdown blog post to prevent the page being build during `astro build`! 🥳

With any luck, you wont see this page... until I remove the draft flag!

## Here's the front matter for this page... 

```astro
---
setup: |
    import ReactCounter from '../../components/ReactCounter.jsx'

title: Astro now has Draft Posts in Markdown!
author: Sarah
date: '2022-01-26'
draft: true
description: "An exciting contribution by a community member has us all drafting new posts..."
layout: ../../layouts/MarkdownPostLayout.astro
slug: draft-markdown-posts-in-astro
tags: ["astro", "markdown", "blogging"]
---
```

## And here's a React Counter component...

Just so we have something else exciting in front matter to show off.  ;)

<ReactCounter client:load/>
