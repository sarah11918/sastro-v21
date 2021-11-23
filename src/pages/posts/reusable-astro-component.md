---
title: Making a reusable Astro component from CodePen's embed HTML
author: Sarah
date: 2021-09-16
description: Since interactive CodePen embedded workspaces are sometimes better, and more accessible ways to blog about code, I thought I'd extract the patterns in the HTML and practice making a little Astro component!
layout: ../../layouts/MarkdownPostLayout.astro

---
# Making a reusable Astro component from a CodePen's embed HTML

[CodePen.io](https://codepen.io) allows you to easily write some HTML, CSS and JS in a browser and see a live web preview of your code. It's been very handy for working out smaller bits of logic without spinning up Gitpod or CodeSandbox for a fuller dev environment.

Since I'm now including a lot of code snippets in my blog posts, I thought I'd try including some interactive CodePen embeds. (You can see one [in this post](/posts/5-pin-bowling-simulation).) Conveniently, CodePen has an "embed" button right in their workspace that generates HTML code for including on a web page. It looks something like this:

    <p class="codepen" data-height="300" data-theme-id="light" data-default-tab="js,result" data-slug-hash="VwKKvMa" data-editable="true" data-user="sarah11918" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/sarah11918/pen/VwKKvMa">
      stupid die roll</a> by Sarah Rainsberger (<a href="https://codepen.io/sarah11918">@sarah11918</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

When I used this to embed my little 5-pin bowling pin setter logic in a previous post, I found that I needed to customize the HTML a bit to make it better suit my page. While that's obviously not a problem, and easy enough to do, why not make it more complicated...?  :)

Examining the HTML generated by CodePen, it didn't take long to extract some patterns. For example, the url structure is `https://codepen.io/{myUserName}/pen/{idSlug}`

These are the kinds of abstractions that can be pulled out to make a reusable component. Also, I found that I wanted to change the default height of the rendered "pen," so I decided I would also make that a variable that I could pass into my component.

In the end, all the variables I decided to pass in as props to my component are defined on the page rendering the component between the code fences. Some of them are required, but some are optional.

```astro
---
import Pen from '../components/Pen.astro';

let codePenPrefs = {
    user: "sarah11918",
    // slug: "VwKKvMa",
    // height: "400",
    // tabs: "html,result",
    // clickToLoad: "true",
    // editable: "true",

};
---
```

The full sample Astro page looks like this:

```astro
// src/pages/index.astro
---
import Pen from '../components/Pen.astro';
let title = 'CodePen Component Page';

let codePenPrefs = {
    user: "sarah11918",
    // slug: "VwKKvMa",
    // height: "400",
    // tabs: "html,result",
    // clickToLoad: "true",
    // editable: "true",

};
---
<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width">
	    <title>{title}</title>
	    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
	    <link rel="stylesheet" href="/style/global.css">
	</head>
	<body>
	    <img width="60" height="80" src="/assets/logo.svg" alt="Astro logo">
	    <h1>My Awesome CodePen Component</h1> 
	    <Pen client:load user={codePenPrefs.user} slug={codePenPrefs.slug} height={codePenPrefs.height} tabs={codePenPrefs.tabs} clickToLoad={codePenPrefs.clickToLoad} editable={codePenPrefs.editable}/>
	</body>
</html>
```
Then, in my Astro Pen component, I destructured out these props, and created default values for *some of them* so that not every variable needed to be passed in:
```astro
---
const { slug, user, height = "300", tabs = "js,result", editable="true", clickToLoad = "false" } = Astro.props
---
```
I find it easiest to create as many of my "mixed content" (variables injected into static content) items in my Astro front matter component script as possible, and just use single variables in the HTML when I can. So, I also created the necessary URLs (link to the pen, like to the user) before writing any HTML.

So my full front-matter is:
```astro
---
const { slug, user, height = "300", tabs = "js,result", editable="true", clickToLoad = "false" } = Astro.props
const penURL = `https://codepen.io/sarah11918/pen/${slug}`
const userURL = `https://codepen.io/${user}`
---
```
Now for the html...

The HTML from CodePen includes a styled ```p```, but instead, I used an Astro ```style``` tag in the component body to style a wrapping ```div``` with a class name. All that I kept on the ```p``` was the ```class="codepen"``` beause I suspect it is used by CodePen itself. 

Now I have all the ingredients I need to go through CodePen's ```p``` tag and replace values with my props. (I'm taking a little liberty with the formatting for ease of readbility.) Making sure to include CodePen's ```script``` tag at the bottom, here is my finished ```<Pen />``` Astro component:

```astro
// src/components/Pen.astro
---
const { slug, user, height = "300", tabs = "js,result", editable="true", clickToLoad = "false" } = Astro.props
const penURL = `https://codepen.io/sarah11918/pen/${slug}`
const userURL = `https://codepen.io/${user}`


---
<style>
	.embed {
	  box-sizing: border-box; 
	  align-items: center; 
	  justify-content: center;
	  width: 100%;
	  margin: 0 auto;
	  border: 2px solid black;
	}
</style>
 
<div class="embed">
	 <p class="codepen" 
		 data-height={height} 
		 data-default-tab={tabs} 
		 data-slug-hash={slug} 
		 data-editable={editable} 
		 data-preview={clickToLoad} 
		 data-user={user}>
		 <span>See the Pen <a href={penURL}>stupid die roll</a> 
			by Sarah Rainsberger (<a href={userURL}>@sarah11918</a>) 
			on <a href="https://codepen.io">CodePen</a>.
		</span>
	</p>
</div>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
```

## In Summary:
1. Make a CodePen!
2. Look for any configurable variables in the provided HTML for embedding (e.g. height, editable, load right away...) as well as anything being used to identify your CodePen (e.g. username, slug) and throw all those goodies into a props object on an Astro page that will import the and render the componenent.
3. Create an Astro component that accepts props, and that defines/destructures these props in its front matter, optionally giving default values to some properties. (Remember: Although your page needs to import the Astro component, the component does not need to export itself!)
4. Rewrite any urls using your identifying prop values.
5. Update the provided HTML by defining values using your configurable prop values.
6. Optionally: extract any styling into a ```style```tag.
7. Not Optionally: remember to include the CodePen ```script``` .
8. Profit!

Is it less work than simply pasting in the embed HTML directly from CodePen? No. But, does it look much different? Also no. But *can* we do it?? Heck, ya!