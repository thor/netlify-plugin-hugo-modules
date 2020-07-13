# Checkout Hugo Modules Using SSH In Netlify

## Why?

You have a [Hugo site that uses modules][hugo_modules], and perhaps you have private modules too.

## What?

Checks out those Hugo modules without you needing to make a mess of your `netlify.toml`.

Additionally, you're in for a treat if some of your Hugo (Go) modules are private: this plugin can configure a rewrite of modules from HTTPS to SSH, allowing for Netlify's deploy keys to work effortlessly with your private Hugo modules.


## Coming Up

- [ ] Add support for Netlify inputs with defaults
- [ ] Add toggle for recursive checkouts of modules
- [ ] *Maybe*: add support for multiple rewrites from HTTPS to SSH

[hugo_modules]: https://gohugo.io/hugo-modules/
